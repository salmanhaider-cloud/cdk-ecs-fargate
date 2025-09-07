import * as cdk from 'aws-cdk-lib';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as ecs_patterns from 'aws-cdk-lib/aws-ecs-patterns';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins';
import * as path from 'path';

export class CdkEcsFargateStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // -------------------- VPC --------------------
    const vpc = new ec2.Vpc(this, 'MyVpc', { maxAzs: 2 });

    // -------------------- ECS Cluster --------------------
    const cluster = new ecs.Cluster(this, 'MyCluster', { vpc });

    // -------------------- Fargate Service + ALB --------------------
    const fargateService = new ecs_patterns.ApplicationLoadBalancedFargateService(this, 'MyFargateService', {
      cluster,
      cpu: 256,
      desiredCount: 1,
      memoryLimitMiB: 512,
      publicLoadBalancer: true,
      taskImageOptions: {
        image: ecs.ContainerImage.fromAsset(path.resolve(__dirname, '..')), 
        containerPort: 80,
      },
    });

    // -------------------- CloudFront Distribution --------------------
    const distribution = new cloudfront.Distribution(this, 'MyCFDistribution', {
      defaultBehavior: {
        origin: new origins.LoadBalancerV2Origin(fargateService.loadBalancer, {
          protocolPolicy: cloudfront.OriginProtocolPolicy.HTTP_ONLY,
        }),
      },
    });

    // -------------------- Output CloudFront URL --------------------
    new cdk.CfnOutput(this, 'CloudFrontURL', {
      value: distribution.distributionDomainName,
      description: 'Global URL for your Fargate app via CloudFront',
    });
  }
}

# Welcome to your CDK TypeScript project

This is a blank project for CDK development with TypeScript.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `npx cdk deploy`  deploy this stack to your default AWS account/region
* `npx cdk diff`    compare deployed stack with current state
* `npx cdk synth`   emits the synthesized CloudFormation template

# ECS Fargate Deployment via CDK + CloudFront + ALB

## Project Overview
This project demonstrates the deployment of an AWS Elastic Container Service (ECS) Fargate service behind an Application Load Balancer (ALB) and exposed globally using CloudFront. The entire infrastructure is created using **AWS CDK (TypeScript)** and can be deployed automatically via **GitHub Actions** CI/CD pipeline.

---

## Architecture
User → CloudFront → ALB → ECS Fargate Service → Docker Container (Sample App)

- **CloudFront**: Global CDN to improve performance and provide HTTPS
- **ALB**: Load balances requests across ECS tasks
- **ECS Fargate**: Serverless container service, no EC2 management needed
- **ECR (Elastic Container Registry)**: Stores Docker images
- **CDK**: Infrastructure as Code to automate resource creation
- **GitHub Actions**: CI/CD pipeline for automated build and deployment

---

## Prerequisites
- AWS Account with IAM user access
- Node.js LTS installed
- AWS CLI configured (`aws configure`)
- AWS CDK installed (`npm install -g aws-cdk`)
- Git & GitHub repository

---

## Project Setup

### 1. Clone Repository
git clone <your-repo-url>
cd ecs-fargate-project

### 2. Bootstrap CDK
cdk bootstrap

### 3. Deploy Infrastructure
cdk deploy

This will create:
- VPC
- ECS Cluster
- Fargate Service with ALB
- CloudFront Distribution

---

## GitHub Actions CI/CD
Workflow file: `.github/workflows/deploy.yml`  
Steps:
1. Checkout repository
2. Configure AWS credentials (via GitHub Secrets)
3. Build & Push Docker image to ECR
4. Run `cdk deploy` to update infrastructure

---

## Testing
- Copy the **CloudFront URL** from CDK outputs
- Open in browser → You should see the **sample ECS app running**

---

## Screenshots
1. AWS Console: ECS Service
2. AWS Console: ALB
3. AWS Console: CloudFront Distribution
4. GitHub Actions workflow run

*(Add your screenshots here)*

---

## Notes
- This project uses **Amazon ECS Sample App** image.  
- Node.js is required only for running CDK and TypeScript.  
- For custom apps, replace Docker image URI in CDK stack.

---

## Author
**Salman Haider**  
Cloud Engineer | Infrastructure as Code Enthusiast

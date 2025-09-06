# Nginx base image use kar rahe hain
FROM nginx:latest

# Apni custom index.html ko nginx ke default web folder me copy karo
COPY index.html /usr/share/nginx/html/index.html

# Port expose karo
EXPOSE 80

# Nginx ko foreground me run karna
CMD ["nginx", "-g", "daemon off;"]

# Use a Node.js image to build the Angular project
FROM node:alpine as build

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy project configuration files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the source code of the application into the container
COPY . .

# Build the application for production
RUN npm run build

# Use an Nginx image to serve the application
FROM nginx:alpine

# Copy custom Nginx configuration
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
# Copy the static files generated to the Nginx directory
COPY --from=build /usr/src/app/dist/student-front /usr/share/nginx/html

# Expose port 80 to be accessible from outside
EXPOSE 80

# Start Nginx and keep the process in the foreground
CMD ["nginx", "-g", "daemon off;"]
# The Dockerfile uses a multi-stage build to keep the final image size small. The first stage uses the node:alpine image
# to build the Angular project. The second stage uses the nginx:alpine image to serve the application. The final image
#only contains the Nginx server and the static files generated by the Angular CLI.

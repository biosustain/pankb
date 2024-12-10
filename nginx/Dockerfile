FROM nginx:1.19.0-alpine

COPY ./default.conf /etc/nginx/conf.d/default.conf

# Create a folder for SSL certificates
RUN mkdir -p /etc/nginx/ssl/live/pankb.org
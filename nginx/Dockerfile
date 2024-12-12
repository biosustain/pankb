FROM nginx:1.19.0-alpine
ARG PANKB_SERVER_TYPE=prod

COPY ./default-$PANKB_SERVER_TYPE.conf /etc/nginx/conf.d/default.conf
RUN [ "$PANKB_SERVER_TYPE" == "prod" ] && mkdir -p /etc/nginx/ssl/live/pankb.org || echo "Not in production"

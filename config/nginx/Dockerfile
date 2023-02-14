FROM nginx:latest

RUN mkdir /app

RUN rm /etc/nginx/conf.d/default.conf

COPY config/instar.conf /etc/nginx/conf.d/default.conf

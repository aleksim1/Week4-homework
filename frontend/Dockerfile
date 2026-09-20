# syntax=docker/dockerfile:1
FROM nginx:1.27-alpine

COPY frontend/nginx.conf /etc/nginx/nginx.conf
COPY frontend/index.html /usr/share/nginx/html/index.html
COPY frontend/js /usr/share/nginx/html/js
COPY frontend/css /usr/share/nginx/html/css

RUN chmod -R 777 /var/cache/nginx /var/run /var/log/nginx

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
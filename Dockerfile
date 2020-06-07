FROM node:12-alpine
COPY . /home

RUN cd /home && npm install --registry https://registry.npm.taobao.org && npm run build

# COPY ./run.sh /usr/share/run.sh

# set env default value.
ENV TZ=Asia/Shanghai \
    BASE_URL="http://localhost"

RUN set -ex \
    # && chmod +x /usr/share/run.sh  \
    && ln -sf /usr/share/zoneinfo/$TZ /etc/localtime \
    && echo "$TZ" > /etc/timezone
    # && rm -rf /app

CMD PORT=80 GIT=${GIT} TEST=${TEST} DB_NAME=${DB_NAME} DB_USER=${DB_USER} DB_PASSWORD=${DB_PASSWORD} DB_HOST=${DB_HOST} DB_PORT=${DB_PORT} node /home/dist/server
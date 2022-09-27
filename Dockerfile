FROM node:dubnium-alpine3.11
WORKDIR /usr/ziq
COPY . .
RUN npm install
RUN npm build
EXPOSE 3000
CMD [ "yarn", "start" ]

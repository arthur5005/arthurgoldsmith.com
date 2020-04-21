FROM node:13-alpine3.10
EXPOSE 8000
ADD ./app /home/node/app
WORKDIR /home/node/app
RUN npm install
RUN export NODE_ENV=production
CMD ["node","index.js"]
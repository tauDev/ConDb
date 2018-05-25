FROM node:8.9.1-alpine
COPY ./package.json vue/src/package.json
WORKDIR /ConDb
RUN npm install
COPY . /ConDb
EXPOSE  3000
CMD ["node","app.js"]
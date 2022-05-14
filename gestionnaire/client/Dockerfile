FROM node:latest
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
RUN npm install
RUN npm i --legacy-peer-deps
RUN npm install -g serve
CMD serve -s build
EXPOSE 443
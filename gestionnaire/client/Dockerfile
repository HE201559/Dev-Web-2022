FROM node
WORKDIR /app
COPY . /app
RUN npm install
RUN npm i --legacy-peer-deps
RUN npm install -g serve
CMD npm run build
EXPOSE 443
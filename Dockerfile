FROM node:8

# Create app directory for express server
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .

# npm i and build react build (production)
WORKDIR /usr/src/app/client
RUN npm i
RUN npm run build

# go back to server and run it
WORKDIR /usr/src/app
CMD npm run server

# run server on port 5000
EXPOSE 5000

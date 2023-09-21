FROM node:18-alpine

# Create directory that runs the app on docker
WORKDIR /app


COPY package.json package-lock.json ./
COPY package*.json ./


RUN npm install --force

COPY . .


RUN npm run build

EXPOSE 5000

CMD npm start





FROM node:16

# Create app directory
WORKDIR /usr/src/app
COPY package*.json ./
COPY package*.json ./
RUN npm install
# Install pm2
RUN npm install pm2 -g
COPY redis-cluster/ .
EXPOSE 3001
CMD [ "pm2-runtime", "ecosystem.config.js" ];
FROM node:17.2.0
WORKDIR /usr/code
COPY package.json .
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "run", "start:prod"]

FROM node:24

WORKDIR /app

COPY . .

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

EXPOSE 8080
CMD ["node", "dist/index.js"]
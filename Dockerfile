FROM node:20-alpine

# Install npm
RUN npm install -g typescript
RUN npm install -g tsx

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

CMD ["npm", "run", "prod"]
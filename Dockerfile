FROM node:20-alpine

# Install pnpm
RUN npm add -g typescript
RUN npm add -g nodemon

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

CMD ["npm", "run", "prod"]
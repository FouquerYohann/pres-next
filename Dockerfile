FROM node:22-alpine

WORKDIR /app
COPY package-lock.json ./
COPY package.json ./

RUN npm ci

COPY . .
RUN rm .env.local

RUN npx prisma generate

ENV NODE_ENV=production


RUN npm run build

EXPOSE 3000
ENTRYPOINT ["npm","run","start"]
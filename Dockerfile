FROM node:22.12.0-alpine

WORKDIR /app

COPY package*.json ./

RUN yarn install

COPY . .

RUN npx prisma generate

EXPOSE 3000

CMD [ "yarn", "start:migrate:prod" ]
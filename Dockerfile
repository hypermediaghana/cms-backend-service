FROM node:alpine

WORKDIR /app/hyper-media

COPY package.json .

RUN npm install

COPY . .

RUN npx prisma db push

EXPOSE 9999

CMD [ "npm", "run", "start" ]
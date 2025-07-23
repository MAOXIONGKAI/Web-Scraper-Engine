FROM node:24-bookworm

COPY package*.json ./

RUN npm install

RUN npx -y playwright@1.54.0 install --with-deps

COPY . .

EXPOSE 5000

CMD ["npm", "start"]

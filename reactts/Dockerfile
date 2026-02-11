# The source was set up by KhangNguyen — do not copy :)
# Source được setup bởi GPT và KhangNguyen, cấm cop dưới mọi hình thức :)

FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN rm -rf node_modules package-lock.json

RUN npm install
RUN npm audit fix --force

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev"]
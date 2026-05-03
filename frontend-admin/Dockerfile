# The source was set up by KhangNguyen — do not copy :)
# Source được setup bởi KhangNguyen, cấm cop dưới mọi hình thức :)

FROM node:24-slim

WORKDIR /app

COPY package*.json ./

RUN rm -rf node_modules package-lock.json

RUN npm install --prefer-offline

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev"]
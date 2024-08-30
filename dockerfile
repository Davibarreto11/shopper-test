FROM node:20

WORKDIR /src/shared/http/server

COPY package*.json ./

RUN npm install

COPY . .

# Verifique se o Prisma CLI está listado em dependencies ou devDependencies no package.json
RUN npm install -g prisma

CMD ["sh", "-c", "npm install && npx prisma migrate dev && npm run dev"]
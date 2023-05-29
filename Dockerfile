# Imagem base
FROM node:18-alpine as builder

ENV NODE_OPTIONS="--max-old-space-size=1024"

# Diretório de trabalho
WORKDIR /app

# Copiando o package.json e o package-lock.json
COPY package*.json ./

# Instalando as dependências
RUN npm install

# Copiando a aplicação
COPY . .

# Construindo a aplicação
RUN npm run build

# Imagem final
FROM nginx:1.21.3-alpine

# Copiando a configuração do Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiando a aplicação construída
COPY --from=0 /app/dist /usr/share/nginx/html

# Expondo a porta utilizada pelo Nginx
EXPOSE 80

# Comando para iniciar o Nginx
CMD ["nginx", "-g", "daemon off;"]

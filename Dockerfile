FROM node
#WORKDIR
#COPY -> copiar hacia mi contenedor
#EXPOSE
#ENV -> Variables de entorno
#RUN -> Correr comandos
#CMD -> Comando iniciar

WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
ENV PORT 4000
EXPOSE 4000

CMD ["npm","run","dev"]

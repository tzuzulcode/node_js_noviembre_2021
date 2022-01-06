FROM node
#WORKDIR
#COPY -> copiar hacia mi contenedor
#EXPOSE
#ENV -> Variables de entorno
#RUN -> Correr comandos
#CMD -> Comando iniciar

COPY package*.json .
RUN npm install

WORKDIR /app
COPY ./src .
ENV PORT 4000
EXPOSE 4000

WORKDIR /

CMD ["npm","run","dev"]

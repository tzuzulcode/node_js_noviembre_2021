const express = require("express")
const cookie = require("cookie-parser")
const productos = require("./router/productos")
const usuarios = require("./router/usuarios")
const auth = require("./router/auth")
//Destructuring
const {connection} = require("./config/db")
const app = express()

// {
//     connection:function(),
//     mongoose:
// }

//Middleware
app.use(express.json())
app.use(cookie())

//Connection to DB
connection()

productos(app)
usuarios(app)
auth(app)

//Codigos de error
//400 - bad request -> sintaxis invalida
//401 - Payment required -> desuso
//403
//404
//405


//Mock ups -> Estructura de información
// Base de datos de prueba

//mpm install mongoose

//Mongo Compass


const server = app.listen(4000)

process.on('unhandledRejection',(err,promise)=>{
    console.log('Error',err.message)
    server.close(()=>process.exit(1))
})
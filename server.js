const express = require("express")
const cookie = require("cookie-parser")
const cors = require("cors")
const passport = require("passport")
const expresssession = require("express-session")

const productos = require("./src/router/productos")
const usuarios = require("./src/router/usuarios")
const auth = require("./src/router/auth")
const email = require("./src/router/email")
//Destructuring
const {connection} = require("./src/config/db");
const config = require("./src/config");
const app = express()

// {
//     connection:function(),
//     mongoose:
// }

//Middleware
app.use(cors({credentials:true,origin:["http://localhost:5500","http://127.0.0.1:5500","http://localhost:3000","http://127.0.0.1:3000"]}))
app.use(cookie())
app.use(express.json())
app.use(expresssession({
    secret:"Mi contraseña"
}))
app.use(passport.initialize())
app.use(passport.session())

//passport.authenticate()

//Connection to DB
connection()

productos(app)
usuarios(app)
auth(app,passport)
email(app)
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

const server = app.listen(config.port)

process.on('unhandledRejection',(err,promise)=>{
    console.log('Error',err.message)
    server.close(()=>process.exit(1))
})
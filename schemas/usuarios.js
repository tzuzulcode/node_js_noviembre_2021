const {mongoose} = require("../config/db")

const {Schema} = mongoose

const usuariosSchema = new Schema(
    {
        nombre:String,
        correo:String,
        contrasena:String,
        rol:String
    }
)
// const ropaSchema = new Schema(
//     {
//         nombre:String,
//         precio:Number,
//         descripcion:String,
//         img:String
//     }
// )

//module.exports = {productosSchema,ropaSchema}
const UsuarioModel = mongoose.model("Usuarios",usuariosSchema)
module.exports = UsuarioModel
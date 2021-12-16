const {mongoose} = require("../config/db")
const Joi = require("joi")
const {Schema} = mongoose

const usuariosSchema = new Schema(
    {
        nombre:String,
        correo:String,
        contrasena:String,
        rol:String,
        provider:String
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

const usuarioSchemaJoi = Joi.object({
    nombre: Joi.string().required().max(200).message("El nombre es requerido y menor a 200 caracteres"),
    correo: Joi.string().email().required().max(200).message("El email debe ser valido, es requerido y menor a 200"),
    contrasena: Joi.string().min(8).alphanum().required(),
    provider:Joi.string().required()
})

//module.exports = {productosSchema,ropaSchema}
const UsuarioModel = mongoose.model("Usuarios",usuariosSchema)
module.exports = {UsuarioModel,usuarioSchemaJoi}
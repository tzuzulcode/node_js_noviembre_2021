const {mongoose} = require("../config/db")

const Joi = require("joi")

const {Schema} = mongoose

const productoSchemaJoi = Joi.object({
    nombre: Joi.string().required().max(30).message("El nombre es requerido y menor a 30 caracteres"),
    precio: Joi.number().required().max(5000).message("El precio es requerido y menor a 5000"),
    descripcion: Joi.string().max(200),
    img:Joi.string()
})

const productosSchema = new Schema(
    {
        nombre:{
            type:String,
            required:[true,'El nombre es requerido'],
            maxlength:[30,"El tamaño máximo es de 30"]
        },
        precio:{
            type:Number,
            max:5000,
            required:[true,'El precio es requerido']
        },
        descripcion:{
            type:String,
            maxlength:200
        },
        img:String
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
const ProductoModel = mongoose.model("ProductoModel",productosSchema)
module.exports = {ProductoModel,productoSchemaJoi}
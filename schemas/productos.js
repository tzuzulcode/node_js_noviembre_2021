const {mongoose} = require("../config/db")

const {Schema} = mongoose

const productosSchema = new Schema(
    {
        nombre:String,
        precio:Number,
        descripcion:String,
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
module.exports = ProductoModel
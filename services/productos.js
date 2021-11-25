const ProductoModel = require("../schemas/productos")

const productos = new ProductoModel({name:"producto"})

class Productos{

    async getProducts(){
        try{
            const resultado = await ProductoModel.find()
            //const resultado = await productos.save()

            //Pending Promise
            return resultado || []
        }catch(error){
            console.log(error)
        }
        
    }

    async getProduct(id){
        const producto = await ProductoModel.findById(id)

        return producto || {}
    }

    async createProduct(data){
        const productoGuardado = await ProductoModel.create(data)

        return productoGuardado || {}
    }
    async updateProduct(id,data){
        const productoActualizado = await ProductoModel.findupByIdAndUpdate(id,data)

        return productoActualizado || {}
    }
    async deleteProduct(id){
        const productoEliminado = await ProductoModel.findByIdAndDelete(id)

        return productoEliminado || {}
    }
}

module.exports = Productos
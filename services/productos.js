const {ProductoModel,productoSchemaJoi} = require("../schemas/productos")

const assert = require("assert")

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
        const validacion = productoSchemaJoi.validate(data)
        //console.log(resultado.error.details[0].message)

        if(!validacion.error){
            const productoGuardado = await ProductoModel.create(data)

            return {data:productoGuardado,success:true,message:"Producto creado exitosamente"}
        }

        return {data:validacion.value,success:false,message:validacion.error.details[0].message}

        try{
            
            const productoGuardado = await ProductoModel.create(data)

            return {data:productoGuardado,success:true,message:"Producto creado exitosamente"}
        }catch(error){
            //error.errors['nombre']
            console.log("Error, al crear producto",error.errors["nombre"].properties.message)
        }

        return {data:validacion.value,success:false,message:error.errors["nombre"].properties.message}
        
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
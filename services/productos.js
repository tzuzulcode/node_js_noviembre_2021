const {ProductoModel,productoSchemaJoi} = require("../schemas/productos")

const assert = require("assert")
const { uploadFile } = require("../libs/s3")

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
    async getProductsByUser(idUsuario){
        const producto = await ProductoModel.find({idUsuario})

        return producto || {}
    }

    async createProduct(data,img){
        const validacion = productoSchemaJoi.validate(data)
        //console.log(resultado.error.details[0].message)

        if(!validacion.error){
            const productoGuardado = await ProductoModel.create(data)
            console.log('Subiendo archivo...')
            uploadFile(img.buffer,img.originalname)
            console.log('Termino de subir...')

            return {data:productoGuardado,success:true,message:"Producto creado exitosamente"}
        }
        

        return {data:validacion.value,success:false,message:validacion.error.details[0].message}

        // try{
            
        //     const productoGuardado = await ProductoModel.create(data)

        //     return {data:productoGuardado,success:true,message:"Producto creado exitosamente"}
        // }catch(error){
        //     //error.errors['nombre']
        //     console.log("Error, al crear producto",error.errors["nombre"].properties.message)
        // }

        // return {data:validacion.value,success:false,message:error.errors["nombre"].properties.message}
        
    }
    async updateProduct(id,data,usuario){
        const producto = await this.getProduct(id)
        if(producto.idUsuario === usuario.id || usuario.rol ==="admin" ){
            let productoActualizado = await ProductoModel.findByIdAndUpdate(id,data)
            return {updated:true,producto:productoActualizado,message:"El producto se actualizó correctamente"}
        }
        

        return {updated:false,message:"Sin permisos para modificar el producto"}
    }
    async deleteProduct(id){
        const productoEliminado = await ProductoModel.findByIdAndDelete(id)

        return productoEliminado || {}
    }
}

module.exports = Productos
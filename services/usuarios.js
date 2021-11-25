const UsuarioModel = require("../schemas/usuarios")

//const productos = new UsuarioModel({name:"producto"})

class Usuarios{

    async getProducts(){
        try{
            const resultado = await UsuarioModel.find()
            //const resultado = await productos.save()

            //Pending Promise
            return resultado || []
        }catch(error){
            console.log(error)
        }
        
    }

    async getUser(correo){
        const usuario = await UsuarioModel.findOne({correo}).exec()

        return usuario
    }

    async createUser(data){
        const usuarioGuardado = await UsuarioModel.create(data)

        return usuarioGuardado || {}
    }
    async updateProduct(id,data){
        const productoActualizado = await UsuarioModel.findupByIdAndUpdate(id,data)

        return productoActualizado || {}
    }
    async deleteProduct(id){
        const productoEliminado = await UsuarioModel.findByIdAndDelete(id)

        return productoEliminado || {}
    }

    
}

module.exports = Usuarios
const {UsuarioModel,usuarioSchemaJoi} = require("../schemas/usuarios")

//const productos = new UsuarioModel({name:"producto"})

class Usuarios{


    async getUser(correo){
        const usuario = await UsuarioModel.findOne({correo}).exec()

        return usuario
    }

    async validateUser(data){
        const validacion = usuarioSchemaJoi.validate(data)

        if(validacion.error){
            return {data:validacion.value,success:false,message:validacion.error.details[0].message}
        }

        const usuarioExiste = await this.getUser(data.correo)
        if(usuarioExiste){
            return {data:validacion.value,success:false,message:"El correo ya esta en uso"}
        }
        

        return {data:validacion.value,success:true,message:"Datos validados correctamente"}
    }

    async createUser(data){
        
        const usuarioGuardado = await UsuarioModel.create(data)

        return {data:usuarioGuardado,success:true,message:"Usuario creado exitosamente"}
    }
    async updateUser(id,data){
        const productoActualizado = await UsuarioModel.findByIdAndUpdate(id,data)

        return productoActualizado || {}
    }
    async deleteProduct(id){
        const productoEliminado = await UsuarioModel.findByIdAndDelete(id)

        return productoEliminado || {}
    }

    
}

module.exports = Usuarios
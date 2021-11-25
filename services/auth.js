const jwt = require("jsonwebtoken")
const Usuarios = require("./usuarios")
class Auth{
    usuarios = new Usuarios()
    async login(correo,contrasena){
        const usuario = await this.usuarios.getUser(correo)
        if(usuario){
            if(contrasena===usuario.contrasena){
                const token = jwt.sign({correo,rol:usuario.rol},"12345",{
                    expiresIn:"1d"
                })
                return {token,usuario,success:true}
            }
        }

        return {"message":"Credenciales incorrectas",success:false}
    }
    async registro(correo,contrasena,nombre){
        const usuario = await this.usuarios.createUser({correo,contrasena,nombre})
        
        if(usuario){
            return {"message":"Registro exitoso",success:true,usuario}
        }

        return {"message":"Credenciales incorrectas",success:false}
    }
}

module.exports = Auth
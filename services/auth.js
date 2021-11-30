const jwt = require("jsonwebtoken")
const Usuarios = require("./usuarios")
const config = require("../config")
const bcrypt = require("bcrypt")

class Auth{
    usuarios = new Usuarios()

    //hash -> encrypt
    async hashPassword(password){
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password,salt)

        return hash
    }

    async login(correo,contrasena){
        const usuario = await this.usuarios.getUser(correo)
        if(usuario){
            const contrasenaCorrecta = await bcrypt.compare(contrasena,usuario.contrasena)
            if(contrasenaCorrecta){
                //UUID
                const token = jwt.sign({correo,rol:usuario.rol},config.jwt_secret,{
                    expiresIn:"1d"
                })
                return {token,usuario,success:true}
            }
        }

        return {"message":"Credenciales incorrectas",success:false}
    }
    async registro(correo,contrasenaOriginal,nombre){
        const contrasena = await this.hashPassword(contrasenaOriginal)
        const usuario = await this.usuarios.createUser({correo,contrasena,nombre})
        
        if(usuario){
            return {"message":"Registro exitoso",success:true,usuario}
        }

        return {"message":"Credenciales incorrectas",success:false}
    }

    async cambiarRol(id,rol){
        const usuario = await this.usuarios.updateUser(id,{rol})
        if(usuario){
            return {"message":"Rol actualizado",success:true,usuario}
        }

        return {"message":"Ocurrio un error",success:false}
    }
}

module.exports = Auth
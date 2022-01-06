const jwt = require("jsonwebtoken")
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const Usuarios = require("./usuarios")
const config = require("../config")
const bcrypt = require("bcrypt")

class Auth{
    usuarios = new Usuarios()
    
    constructor(passport){
        this.passport = passport

        this.authUser.bind(this.registro)

        this.passport.use(new GoogleStrategy({
            clientID:config.google_client_id,
            clientSecret:config.google_client_secret,
            callbackURL:"http://localhost:4000/auth/google/callback",
            passReqToCallback:true
        },this.authUser))

        this.passport.serializeUser(this.serializer)
        this.passport.deserializeUser(this.serializer)
    }

    async authUser(request,accessToken,refreshToken,profile,done){
        //console.log("Request",request)
        //console.log("AccesToken",accessToken)
        //console.log("RefreshToken",refreshToken)
        //console.log("Profile",profile)
        //console.log("Done",done)

        return done(null,{profile,accessToken})
        
    }
    
    serializer(user,done){
        done(null,user)
    }

    google(){
        return this.passport.authenticate("google",{
            scope:['email','profile']
        })
    }

    googleCallback(req,res){
        return new Promise((resolve,reject)=>{
            console.log("haciendo promesa")
            this.passport.authenticate("google",async (error,{profile})=>{
                if(error){
                    return reject({succes:false})
                }
                console.log(profile)
                const {displayName,emails,provider} = profile
                const correo = emails[0].value
                const result = await this.registro(correo,"123456abc",displayName,provider)

                const usuario = result.success?result.data:await this.usuarios.getUser(correo)
                
                const token = jwt.sign({correo,rol:usuario.rol,id:usuario.id},config.jwt_secret,{
                    expiresIn:"1d"
                })

                return resolve({token,usuario,success:true})
            })(req,res)
        })
        
    }
    // serializeUser(user,done){
    //     done(null,user)
    // }
    // deserializeUser(user,done){
    //     done(null,user)
    // }

    //hash -> encrypt
    async hashPassword(password){
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password,salt)

        return hash
    }

    async login(correo,contrasena){
        const usuario = await this.usuarios.getUser(correo)
        //console.log(usuario.id)
        if(usuario){
            const contrasenaCorrecta = await bcrypt.compare(contrasena,usuario.contrasena)
            if(contrasenaCorrecta){
                //UUID
                const token = jwt.sign({correo,rol:usuario.rol,id:usuario.id},config.jwt_secret,{
                    expiresIn:"1d"
                })
                return {token,usuario,success:true}
            }
        }

        return {"message":"Credenciales incorrectas",success:false}
    }
    async registro(correo,contrasenaOriginal,nombre,provider){
        const validacion = await this.usuarios.validateUser({correo,contrasena:contrasenaOriginal,nombre,provider})

        if(validacion.success){
            const contrasena = await this.hashPassword(contrasenaOriginal)
            const usuario = await this.usuarios.createUser({...validacion.data,contrasena})

            return usuario
        }
        
        return {success:false,...validacion}
        
        
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
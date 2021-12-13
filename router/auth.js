const express = require("express")
const { verifyTokenAdmin } = require("../middlewares/authValidation")

const Auth = require("../services/auth")

function auth(app,passport){
    //Routing
    const router = express.Router()
    app.use("/auth",router)

    // Definiendo el servicio
    const authService = new Auth(passport)

    //Configurando passport
    // Puede ir aqui la configuracion de passport
    

    router.get("/google",authService.google())
    
    router.get('/google/callback',authService.googleCallback())

    router.post("/login",async (req,res)=>{
        const {correo,contrasena} = req.body
        console.log(correo)
        const result = await authService.login(correo,contrasena)
        //res.status(200).json()
        let date = new Date().setDate(new Date().getDate()+7)
        if(result.success){
            return res.cookie("token",result.token,{
                httpOnly:true,
                sameSite:"none",
                expires:new Date(date),
                secure:true
            })
            .json({nombre:result.usuario.nombre})
        }
        
        return res.status(404).json(result)
    })

    router.post("/logout",(req,res)=>{
        const date = new Date(new Date()-1)
        return res.cookie("token","",{
            httpOnly:true,
            sameSite:"none",
            expires:date,
            secure:true
        })
        .json({loggedOut:true})
    })
    router.post("/signup",async (req,res)=>{
        const {correo,nombre,contrasena} = req.body
        const result = await authService.registro(correo,contrasena,nombre)
        //res.status(200).json()
        return res.status(result.success?201:400).json(result)
    })
    router.put("/cambiar_rol/:id",verifyTokenAdmin, async (req,res)=>{
        const {rol} = req.body
        const {id} = req.params
        const result = await authService.cambiarRol(id,rol)
        //res.status(200).json()
        if(result.success){
            return res.status(200).json({nombre:result.usuario.nombre})
        }
        
        return res.status(400).json(result)
    })
}

module.exports = auth
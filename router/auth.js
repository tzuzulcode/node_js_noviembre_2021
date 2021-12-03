const express = require("express")
const { verifyTokenAdmin } = require("../middlewares/authValidation")

const Auth = require("../services/auth")

function auth(app){
    const router = express.Router()
    app.use("/api/auth",router)

    const authService = new Auth()

    router.post("/login",async (req,res)=>{
        const {correo,contrasena} = req.body
        console.log(correo)
        const result = await authService.login(correo,contrasena)
        //res.status(200).json()
        if(result.success){
            return res.cookie("token",result.token,{httpOnly:true})
            .status(200)
            .json({nombre:result.usuario.nombre})
        }
        
        return res.status(404).json(result)
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
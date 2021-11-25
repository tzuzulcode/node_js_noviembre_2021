const express = require("express")

const Usuarios = require("../services/usuarios")

function usuarios(app){
    const router = express.Router()
    app.use("/api/usuarios",router)

    const productosService = new Usuarios()

    router.get("/",async (req,res)=>{
        const result = await productosService.getProducts()
        res.status(200).json(result)
    })
    // router.get("/:id",async (req,res)=>{
    //     const id = req.params.id
    //     const result = await productosService.getProduct(id)
    //     res.status(200).json(result)
    // })
    // router.post("/",async (req,res)=>{
    //     const data = req.body
    //     const result = await productosService.createProduct(data)
    //     res.status(201).json(result)
    // })
    // router.put("/:id",async (req,res)=>{
    //     const data = req.body
    //     const id = req.params.id
    //     const result = await productosService.updateProduct(id,data)
    //     res.status(200).json(result)
    // })
    // router.delete("/:id",async (req,res)=>{
    //     const id = req.params.id
    //     const result = await productosService.deleteProduct(id)
    //     res.status(200).json(result)
    // })
    // router.post("/login",async (req,res)=>{
    //     const {correo,nombre,contrasena} = req.body
    //     const result = await productosService.login(correo,contrasena,nombre)
    //     //res.status(200).json()
    //     if(result.success){
    //         return res.cookie("token",result.token,{httpOnly:true})
    //         .status(200)
    //         .json({nombre:result.usuario.nombre})
    //     }
        
    //     return res.status(404).json(result)
    // })
}

//JSON -> JS Object Notation
let persona = {
    nombre:"Tzuzul",
    ciudad:"Ciudad de México"
}
let personaJSON = {
    "nombre":"Tzuzul",
    "ciudad":"Ciudad de México"
}

module.exports = usuarios
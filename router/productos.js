const express = require("express")
const {verifyToken,verifyTokenEditor,verifyTokenAdmin} = require("../middlewares/authValidation")

const Productos = require("../services/productos")

function productos(app){
    const router = express.Router()
    app.use("/api/productos",router)

    const productosService = new Productos()

    router.get("/", verifyTokenAdmin, async (req,res)=>{
        const result = await productosService.getProducts()
        res.status(200).json(result)
    })
    router.get("/:id",async (req,res)=>{
        const id = req.params.id
        const result = await productosService.getProduct(id)
        res.status(200).json(result)
    })
    router.post("/",verifyToken,async (req,res)=>{
        const data = req.body
        const result = await productosService.createProduct(data)
        res.status(201).json(result)
    })
    router.put("/:id",verifyToken,async (req,res)=>{
        const data = req.body
        const id = req.params.id
        const result = await productosService.updateProduct(id,data)
        res.status(200).json(result)
    })
    router.delete("/:id",verifyToken,async (req,res)=>{
        const id = req.params.id
        const result = await productosService.deleteProduct(id)
        res.status(200).json(result)
    })
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

module.exports = productos
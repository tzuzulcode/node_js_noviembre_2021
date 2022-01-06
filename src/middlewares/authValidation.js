const jwt = require("jsonwebtoken")
const config = require("../config")

const obtenerRol = (token,validacion,req,res,next)=>{
    if(!token){
        return res.status(403).json({message:"Se necesita un token para acceder"})
    }

    try{
        const decodedToken = jwt.verify(token,config.jwt_secret)
        const {rol} = decodedToken

        if(validacion==="regular"){
            req.usuario = decodedToken
            return next()
        }else if(validacion ==="editor" && (rol==="admin" || rol ==="editor")){
            req.usuario = decodedToken
            return next()
        }else if(validacion==="admin" && rol==="admin"){
            req.usuario = decodedToken
            return next()
        }
    }catch(error){
        return res.status(401).json({message:"Token invalido"})
    }
    return res.status(403).json({message:"No cuentas con permisos necesarios"})
}

const verifyToken = (req,res,next)=>{
    const {token} = req.cookies
    return obtenerRol(token,"regular",req,res,next)
}
const verifyTokenEditor = (req,res,next)=>{
    const {token} = req.cookies
    return obtenerRol(token,"editor",req,res,next) 
}
const verifyTokenAdmin = (req,res,next)=>{
    const {token} = req.cookies
    return obtenerRol(token,"admin",req,res,next) 
}
    

module.exports = {verifyToken,verifyTokenEditor,verifyTokenAdmin}
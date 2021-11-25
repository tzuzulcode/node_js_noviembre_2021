const jwt = require("jsonwebtoken")

//const config = require("../config")

const verifyToken = (req,res,next)=>{
    const {token} = req.cookies

    if(!token){
        return res.status(403).json({message:"Se necesita un token para acceder"})
    }

    try{
        const decodedToken = jwt.verify(token,"12345")
        req.usuario = decodedToken
    }catch(error){
        return res.status(401).json({message:"Token invalido"})
    }

    return next()
}
const verifyTokenEditor = (req,res,next)=>{
    const {token} = req.cookies

    if(!token){
        return res.status(403).json({message:"Se necesita un token para acceder"})
    }

    try{
        const decodedToken = jwt.verify(token,"12345")
        const {rol} = decodedToken
        if(rol==="admin" || rol ==="editor"){
            return next()
        }


    }catch(error){
        return res.status(401).json({message:"Token invalido"})
    }

    return res.status(403).json({message:"No cuentas con permisos necesarios"})
    
}

module.exports = {verifyToken,verifyTokenEditor}
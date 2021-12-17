const express = require("express")
const Email = require("../services/email")

function email(app){
    const router = express.Router()
    app.use("/api/email",router)

    const emailService = new Email()

    router.post("/", async (req,res)=>{
        const {to,subject,text,html} = req.body
        let resultado = await emailService.sendMail(to,subject,text,html)

        return res.status(200).json({resultado})
    })
}

module.exports = email
const nodemailer = require("nodemailer");
const config = require("../config");



class Email{
    constructor(){
        this.transporter = nodemailer.createTransport({
            host: config.email_host,
            port: config.email_port,
            secure: config.email_secure, // true for 465, false for other ports
            auth: {
              user: config.email_user, // generated ethereal user
              pass: config.email_password, // generated ethereal password
            },
        });
    }

    async sendMail(to,subject,text,html){
        console.log({to,subject,text,html})
        let info = await this.transporter.sendMail({
            from:"info@tzuzulcode.com",
            to,
            subject,
            text,
            html
        })


        console.log(info)
        return {success:true}
    }
}

module.exports = Email
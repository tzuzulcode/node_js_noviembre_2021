const mongoose = require("mongoose")
const config = require("./index")

const connection = async()=>{
    const conn = await mongoose.connect(`mongodb+srv://tzuzul:${config.password}@tzuzulcode.btnt0.mongodb.net/tienda`)
    //const conn = await mongoose.connect(`mongodb+srv://tzuzul:${config.password}@tzuzulcode.btnt0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`)
    console.log("Mongo DB Connected",conn.connection.host)
}

module.exports = {connection,mongoose}
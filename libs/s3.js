const aws = require('aws-sdk')
const fs = require('fs')
const config = require('../config')

const s3 = new aws.S3()

const uploadFile = (fileContent,key) =>{

    s3.upload({
        Bucket:config.aws_bucket_name,
        Key:key,//El nombre de archivo que tendra en s3
        Body:fileContent
    },(error,data)=>{
        if(error){
            throw error
        }

        console.log('Archivo subido:',data.location)
    })
}

module.exports = {uploadFile}

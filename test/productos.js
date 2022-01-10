const mongoose = require("mongoose")
const {ProductoModel} = require("../src/schemas/productos")
const chai = require("chai")
const chaiHTTP = require("chai-http")
const server = require("../server")
const should = chai.should


chai.use(chaiHTTP)

describe('Productos',()=>{
    beforeEach((done)=>{
        ProductoModel.remove({},(err)=>{
            done()
        })
    })
})

describe('/GET productos',()=>{
    it('it should GET all products',(done)=>{
        
        chai.request(server)
            .get("/api/productos")
            .end((err,res)=>{
                should(res)
                res.should.have.status(200)
                res.body.should.be.a('array')
                res.body.length.should.be.eql(0)
                done()
            })
    }) 
})

describe('/POST productos',()=>{
    it('it should not POST a product',(done)=>{
        chai.request(server)
            .post("/api/productos")
            .send({
                nombre:"Mi producto"
            })
            .end((err,res)=>{
                should(res)
                res.should.have.status(403)
                res.body.should.be.a('object')
                res.body.should.have.property("message")
                res.body.message.should.be.eql("Se necesita un token para acceder")
                done()
            })
    }) 
})




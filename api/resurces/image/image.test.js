/*const request = require("supertest");

const { app, server } = require("../../../index");

describe("IMAGE TESTS" , ()=>{
    describe("If content-type is bad must fail", (done)=>{
        request(app)
        .post('/test')
        .attach('image', __dirname + '/fixtures/fatcat.jpeg')
        .expect('Content-Type', /json/)
        .expect('Content-Length', '15')
        .expect(201)
        .end(function(err, res){
          if (err) throw err;
          done();
        });
    })
})*/
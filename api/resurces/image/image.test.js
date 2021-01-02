const request = require("supertest");
const jwt = require("jsonwebtoken");
const path = require("path");

const { app, server } = require("../../../index");
const config = require("../../../config");
const User = require("../user/user.model")


describe("IMAGE TESTS" , ()=>{

  beforeEach((done) => {
    User.deleteMany({}, (err) =>{
     done();
   })
  });

  afterAll(() => {
    server.close();
  });

  test("If content-type is bad must fail",async (done)=>{
    console.log(path.join(__dirname,"/imageTest.png"))
       const user = await new User({
         username:"pablo casta",
         email: "pablo_c86@hotmail.com",
         password: "1234567",
       }).save();
    const _id= user._id;
        request(app)
        .put('/api/users/image')
        .set('Authorization', `Bearer ${jwt.sign({_id}, config.jwt.secret,{
          expiresIn: config.jwt.expiresIn,
        })}`)
        .set("content-type","image/png")
        .attach('image', path.join(__dirname,"/imageTest.png"))
        .end((err, res) => {
          expect(res.status).toBe(200);
          expect(typeof res.text).toBe("string");
          done();
        });
    })
})
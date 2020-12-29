const request = require("supertest");
const jwt = require("jsonwebtoken");

const { app, server } = require("../../../index");
const User = require("./user.model");
const config = require("../../../config");
const logger = require("../../../ultis/logger");

function checkJWTandUser (user1,user2,token, done){
  if(user1.username === user2.username && user1.email === user2.email){
    logger.info("Username and email ar ok");
    const _id = user2._id;
    if (token === jwt.sign({_id},config.jwt.secret,{
      expiresIn:config.jwt.expiresIn
    })){
      logger.info("Token ar the same")
      done();
    }else{
      logger.warn("token ar not the same")
    }
  }else{
    logger.warn("Username and email ar not the same.");
  }
}
describe("Test Singup.", () => {
  beforeEach((done) => {
    User.deleteMany({}, (err) =>{
     done();
   })
  });

  afterAll(() => {
    server.close();
  });

  test("User must have a username", (done) => {
    request(app)
      .post("/api/users/singup")
      .send({
        email: "pablo@hotmail.com",
        password: "1234567",
      })
      .end((err, res) => {
        expect(res.status).toBe(400);
        expect(typeof res.text).toBe("string");
        done();
      });
  }, 10000);
  test("Username must be not shortter than 6 chars", (done) => {
    request(app)
      .post("/api/users/singup")
      .send({
        username: "abcd",
        email: "pablo@hotmail.com",
        password: "1234567",
      })
      .end((err, res) => {
        expect(res.status).toBe(400);
        expect(typeof res.text).toBe("string");
        done();
      });
  }, 10000);
  test("Username must be not lognger than 100 chars", (done) => {
    request(app)
      .post("/api/users/singup")
      .send({
        username:
          "qwertyuiopqwertyuiopqwertyuiopqwertyuiopqwertyuiopqwertyuiopqwertyuiopqwertyuiopqwertyuiopqwertyuiopd",
        email: "pablo@hotmail.com",
        password: "1234567",
      })
      .end((err, res) => {
        expect(res.status).toBe(400);
        expect(typeof res.text).toBe("string");
        done();
      });
  }, 10000);
  test("User must have a email", (done) => {
    request(app)
      .post("/api/users/singup")
      .send({
        username: "abcdefg",
        password: "1234567",
      })
      .end((err, res) => {
        expect(res.status).toBe(400);
        expect(typeof res.text).toBe("string");
        done();
      });
  }, 10000);
  test("Email must be valid", (done) => {
    request(app)
      .post("/api/users/singup")
      .send({
        username: "abcdefg",
        email: "pablo@hotmail",
        password: "1234567",
      })
      .end((err, res) => {
        expect(res.status).toBe(400);
        expect(typeof res.text).toBe("string");
        done();
      });
  }, 10000);
  test("User must have a password", (done) => {
    request(app)
      .post("/api/users/singup")
      .send({
        email: "pablo@hotmail.com",
        username: "abcdefg",
      })
      .end((err, res) => {
        expect(res.status).toBe(400);
        expect(typeof res.text).toBe("string");
        done();
      });
  }, 10000);
  test("password must be not shortter than 6 chars", (done) => {
    request(app)
      .post("/api/users/singup")
      .send({
        username: "abcdefg",
        email: "pablo@hotmail.com",
        password: "12345",
      })
      .end((err, res) => {
        expect(res.status).toBe(400);
        expect(typeof res.text).toBe("string");
        done();
      });
  }, 10000);
  test("Password must be not lognger than 50 chars", (done) => {
    request(app)
      .post("/api/users/singup")
      .send({
        username: "abcdefg",
        email: "pablo@hotmail.com",
        password: "qwertyuiopqwertyuiopqwertyuiopqwertyuiopqwertyuiopg",
      })
      .end((err, res) => {
        expect(res.status).toBe(400);
        expect(typeof res.text).toBe("string");
        done();
      });
  }, 10000);

  test("Check if user exist in data base",async (done) => {
   await new User({
      username:"abcdefg",
      email:"pablo_c86@hotmail.com",
      password:"1234567",
    }).save();
    request(app)
      .post("/api/users/singup")
      .send({
        username:"abcdefg",
        email:"pablo_c86@hotmail.com",
        password:"1234567",
      })
      .end((err, res) => {
        expect(res.status).toBe(400);
        expect(typeof res.text).toBe("string");
        done();
      });
  }, 10000);

  test("If username, password and email are valid and user is free. Must create succesfully", (done) => {
    request(app)
      .post("/api/users/singup")
      .send({
        username: "abcdefgh",
        email: "pablo2@hotmail.com",
        password: "qwertyuiop",
      })
      .end((err, res) => {
        expect(res.status).toBe(201);
        expect(typeof res.body.token).toBe("string");
        expect(typeof res.body.user).toBe("object");
        checkJWTandUser ({
          username: "abcdefgh",
          email: "pablo2@hotmail.com",
          password: "qwertyuiop",
        },res.body.user,res.body.token, done)
       
      });
  }, 10000);
});

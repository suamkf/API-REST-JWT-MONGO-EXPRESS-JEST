const request = require("supertest");
const jwt = require("jsonwebtoken");
const path = require("path");

const { app, server } = require("../../../index");
const config = require("../../../config");
const User = require("../user/user.model");

describe("IMAGE TESTS", () => {
  beforeEach((done) => {
    User.deleteMany({}, (err) => {
      done();
    });
  });

  afterAll(() => {
    
    server.close();
  });

  it("If content-type is bad must fail", async (done) => {
    console.log(path.join(__dirname, "/imageTest.png"));
    console.log(require("fs").readFileSync(`${path.join(__dirname, "/imageTest.png")}`))
    const user = await new User({
      username: "pablo casta",
      email: "pablo_c86@hotmail.com",
      password: "1234567",
    }).save();
    const _id = user._id;
    request(app)
      .put("/api/users/image")
      .set(
        "Authorization",
        `Bearer ${jwt.sign({ _id }, config.jwt.secret, {
          expiresIn: config.jwt.expiresIn,
        })}`
      )
      .set("Content-Type", "image/png")
     //.attach("file", `${path.join(__dirname, "/imageTest.png")}`)
     .send( require("fs").readFileSync(`${path.join(__dirname, "/imageTest.png")}`))
     .end((err, res) => {
        expect(res.status).toBe(200);
        expect(typeof res.text).toBe("string");
        done();
      });
  });
});

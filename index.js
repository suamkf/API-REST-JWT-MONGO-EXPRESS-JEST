
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const morgan = require("morgan");
require("dotenv").config();
const config = require("./config");
const logger = require("./ultis/logger");
const userRouter = require("./api/resurces/user/user.route");
const errorHandler = require("./api/libs/errorHandler");
const authJWT = require("./api/libs/auth.js");


passport.use(authJWT);

mongoose.connect(config.mongo.uri, {
  useCreateIndex: true,
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on(`error`, () => {
  logger.error("fail to connect con Mogno DB");
  process.exit(1);
});



const app = express();
const port = config.server.port;



app.use(bodyParser.json());
app.use(bodyParser.raw({ type: "image/#", limit:config.S3.limit}));
app.use(morgan("short",{
  stream:{
    write: message => logger.info(message.trim()),
  }
}))
app.use(passport.initialize());
app.use("/api/users", userRouter);
app.use(errorHandler.mongoError);

if (config.server.env === "prod") {
  app.use(errorHandler.prodError);
} else {
  app.use(errorHandler.devError)
}

const server = app.listen(port, () => {
  logger.info(`Server running on port ${port} `);
});

module.exports = {
  app,
  server,
};

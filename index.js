require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const morgan = require("morgan");

const config = require("./config");
const logger = require("./ultis/logger");
const userRouter = require("./api/resurces/user/user.route");
const errorHandler = require("./api/libs/errorHandler");
const auth = require("./api/libs/auth");


passport.use(auth);

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

app.use(errorHandler.mongoError);
if (config.server.env === "prod") {
  app.use(errorHandler.prodError);
} else {
  app.use(errorHandler.devError);
}
app.use(passport.initialize());
app.use("/api/users", userRouter);

const server = app.listen(port, () => {
  logger.info(`Server running on port ${port} `);
});

module.exports = {
  app,
  server,
};

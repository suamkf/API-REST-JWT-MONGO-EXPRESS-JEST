const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require("passport");

const {
  validateUserInfo,
  checkUserInDataBase,
  toLowweCase,
} = require("./user.validate");
const { saveUser, uploadUserImage } = require("./user.controller");
const { errorHandler } = require("../../libs/errorHandler");
const config = require("../../../config");
const logger = require("../../../ultis/logger");
const { validetaImageFormat } = require("../image/image.validate");
const { saveImage } = require("../image/image.controller");
const { craateImageName } = require("../image/image.funtions");

const jwtAuth = passport.authenticate("jwt", { session: false });

const userRouter = express.Router();

function createToken(_id) {
  return jwt.sign({ _id }, config.jwt.secret, {
    expiresIn: config.jwt.expiresIn,
  });
}

function hideSensibleInformation(user) {
  return {
    _id: user._id,
    username: user.username,
    email: user.email,
    image: user.image,
    created_at: user.created_at,
    updated_at: user.created_at,
  };
}

userRouter.post(
  "/singup",
  [validateUserInfo, toLowweCase, checkUserInDataBase],
  errorHandler((req, res) => {
    //  const { username, email, password } = req.body;
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    return bcrypt
      .hash(password, parseInt(config.bcrypt.saltOrRounds))
      .then((hashedPassword) => {
        logger.info(
          `In registration process username: ${username} and email:${email} hashed succesfully password: ${hashedPassword}`
        );
        const newUserToRegister = {
          username,
          email,
          password: hashedPassword,
        };
        logger.info(newUserToRegister);
        return saveUser(newUserToRegister);
      })
      .then((user) => {
        const newUSer = hideSensibleInformation(user);
        logger.info(`New user was create succesfully with data ${newUSer}`);
        const token = createToken(user._id);
        logger.info(`Token was created succesfully ${token} `);
        res.status(201).json({
          user: newUSer,
          token,
        });
      });
  })
);

userRouter.put(
  "/image",
  [jwtAuth, validetaImageFormat],
  errorHandler((req, res) => {
    logger.info(
      `The user with usermane : ${req.user.username} will try to upload a image`
    );
    saveImage(req.body, craateImageName(req.extention))
      .then((url) => {
        return uploadUserImage(req.user._id, url);
      })
      .then((user) => {
        logger.info(
          `User with username:${user.username} upload a new user image.`
        );
        res.status(200).json({
          user: hideSensibleInformation(user),
        });
      });
  })
);

module.exports = userRouter;

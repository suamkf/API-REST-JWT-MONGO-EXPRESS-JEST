const passportJWT = require("passport-jwt");

const config = require("../../config");
const logger = require("../../ultis/logger");
const { getUserById } = require("../resurces/user/user.controller");
const { errorHandler } = require("./errorHandler");

const jwtOptions = {
  secretOrKey: config.jwt.secret,
  jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
};
module.exports = passportJWT.Strategy(
  jwtOptions,
  errorHandler((Payload, next) => {
    return getUserById(Payload._id).then((users) => {
      if (users.length > 0) {
        logger.info(
          `User with username: ${users[0].username} send a valid token`
        );
        next(null, {
          ...users[0],
        });
      } else {
        logger.info(`User send a invalid token`);
        next(null, false);
      }
    });
  })
);

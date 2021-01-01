const passportJWT = require ('passport-jwt')

const config = require("../../config");
const logger = require("../../ultis/logger");
const { getUserById } = require("../resurces/user/user.controller");


const jwtOptions = {
  secretOrKey: config.jwt.secret,
  jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
};
module.exports = new passportJWT.Strategy(
  jwtOptions,
  (Payload, next) => {
   getUserById(Payload._id)
   .then((users) => {
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
    })
    .catch(error=>{
      logger.info(error)
      next(null,false);
    })
  }
);

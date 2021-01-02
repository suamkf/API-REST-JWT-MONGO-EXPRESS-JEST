const passportJWT = require("passport-jwt");

const config = require("../../config");
const logger = require("../../ultis/logger");
const { getUserById } = require("../resurces/user/user.controller");

let jwtOptions = {
  secretOrKey: config.jwt.secret,
  jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
};

module.exports = new passportJWT.Strategy(jwtOptions, (token, next) => {
    getUserById(token._id)
    .then((users) => {
      if (users.length > 0) {
        logger.info(
          `User with username: ${users[0].username} send a valid token`
        );
        next(null, {
          _id: users[0]._id,
          username: users[0].username,
          email: users[0].email,
          image: users[0].image,
          created_at: users[0].created_at,
          updated_at: users[0].created_at,
        });
      } else {
        logger.info(`User send a invalid token`);
        next(null, false);
      }
    })
    .catch((error) => {
      logger.info(error);
      next(null, false);
    });
});

const devConfig = require("./dev");
const prodConfig = require("./prod");

const config = {
  server: {
    port: process.env.PORT || 3000,
    env: "dev",
  },
  mongo: {
    uri: process.env.MONGO_URI,
    userCollection: "user",
  },
  bcrypt: {
    saltOrRounds: process.env.SALT_OR_ROUNDS,
  },
  jwt: {
    expiresIn: "24h",
  },
  S3:{
    validMineType: ["image/png", "image/jpeg", "image/jpg"],
    bucket:"pueba-api-node",
    folder:"image",
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_KEY,
    saveOnS3:false,
    limit: "8mb",
  }
};

switch (config.server.env) {
  case "dev":
    config.jwt = {
      ...config.jwt,
      ...devConfig.jwt,
    };
    break;
  case "prod":
    config.jwt = {
      ...config.jwt,
      ...prodConfig.jwt,
    };
    break;
  default:
    config.jwt = {
      ...config.jwt,
      ...devConfig.jwt,
    };
    break;
}

module.exports = {
  ...config,
};

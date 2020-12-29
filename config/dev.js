const config = {
    jwt: {
      secret: process.env.DEV_SECRET,
    },
  };
  
  module.exports = {
    ...config,
  };
  
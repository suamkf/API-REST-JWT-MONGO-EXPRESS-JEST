const config = {
  jwt: {
    secret: process.env.PROD_SECRET,
  },
};

module.exports = {
  ...config,
};

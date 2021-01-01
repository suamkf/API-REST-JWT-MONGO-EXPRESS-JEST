const User = require("./user.model");

const logger = require("../../../ultis/logger");

function getUserByUsernameAndEmail(username, email) {
  return User.find({ $or: [{ username }, { email }] });
}

function getUserById(_id) {
  return User.find({ _id });
}

function saveUser(user) {
   logger.info(`try to save new user ${user.username}`);
  return new User({ ...user }).save();
  
}

function uploadUserImage (_id,image){

  return User.findByIdAndUpdate({_id}, {image},{new:true});
}

module.exports = {
  getUserById,
  getUserByUsernameAndEmail,
  saveUser,
  uploadUserImage,
};

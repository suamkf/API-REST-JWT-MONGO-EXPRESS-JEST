const Joi = require("joi");
const { restart } = require("nodemon");

const logger = require("../../../ultis/logger");
const { getUserByUsernameAndEmail } = require("./user.controller");
const { errorHandler }= require("../../libs/errorHandler");

const bluePrintUser = Joi.object().keys({
  username: Joi.string().min(6).max(100).required(),
  email: Joi.string().email().required(),
  password: Joi.string().alphanum().min(6).max(50).required(),
});

function validateUserInfo(req, res, next) {
  const validation = bluePrintUser.validate(req.body, {
    abortEarly: false,
    convert: false,
  });

  if (validation.error != undefined) {
    const catchErrs = validation.error.details.reduce((acumulatorError,error) =>{
        return acumulatorError + `[${error.message}]`
      }, "")
    const messageResponse = `Validaion info fail, please check errors and try again. ${catchErrs}`;
    logger.warn(messageResponse);
    res.status(400).send(messageResponse);
    return;
  }
  logger.info("Username, email and password have the correct format.");
  next();
}

const  checkUserInDataBase = errorHandler((req,res,next)=>{
    return getUserByUsernameAndEmail(req.body.username, req.body.email)
    .then((users)=>{
        if(users.length > 0){
            logger.warn(`Already exist user with this username or email`);
            res.status(400).send("Already exist user with this username or email`");
            return;
        }
        logger.info("There are no user register with this username and email. ")
        next();
    })
})

function toLowweCase(req,res,next){
  req.body.username= req.body.username.toLowerCase() ;
  req.body.email= req.body.email.toLowerCase() ;
  logger.info("User username and email converto to lowe case");
  next();
}

module.exports={
    validateUserInfo,
    checkUserInDataBase,
    toLowweCase,
}

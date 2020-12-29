const mongoose = require("mongoose");

const logger = require("../../ultis/logger");

const errorHandler = (fn)=>{
    return function(req,res,next){
        fn(req,res,next).catch(next);
    }
}

const mongoError = (err,req,res,next)=>{
    if (err instanceof mongoose.Error){
        logger.info(`Error ocurred with mongo db ${err.message}`);
        err.message= `Internal server Error`;
        err.status=500;
    }

    next(err);
}


const prodError = (err,req,res,next)=>{

    logger.error(err);
    res.status(err.status || 500)
    .send({
        message: err.message,
        stack: err.stack || ``,
    })

}

const devError = (err,req,res,next)=>{

    logger.error(err);
    res.status(err.status || 500)
    .send({
        message: err.message,
       
    })

}

module.exports={
    errorHandler,
    mongoError,
    devError,
    prodError,
}
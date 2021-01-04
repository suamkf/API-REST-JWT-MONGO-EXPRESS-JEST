const fileType = require("file-type");

const config = require("../../../config");
const logger = require("../../../ultis/logger");

const validMineType = config.S3.validMineType;

function validetaImageFormat(req, res, next) {
  
  const mineTypeImageBody =req.get('Content-Type')
  console.log(validMineType)
  console.log(`mineType: ${mineTypeImageBody}`)
  if (!validMineType.includes(mineTypeImageBody)) {
    
    logger.warn(`Image tyte is not acepted. Must be ${validMineType.join()}`);
    res
      .status(400)
      .send(`Image tyte is not acepted. Must be ${validMineType.join()}`);
    return;
  }
  logger.info(`The content-type [${mineTypeImageBody}] fromm request is ok validation continius`)
  consolo.log(`body: ${req.body}`)
  const fileTypeImae = filetype(req.body);
  console.log("validation image process")
  if (!validMineType.includes(fileTypeImae.mine)) {
    logger.warn(`Image tyte is not acepted. Must be ${validMineType.join()}`);
    res
      .status(400)
      .send(`Image tyte is not acepted. Must be ${validMineType.join()}`);
    return;
  }
  logger.info("Correct image format");
  req.extention = fileTypeImae.ext;
  next();
}

module.exports = {
  validetaImageFormat,
};

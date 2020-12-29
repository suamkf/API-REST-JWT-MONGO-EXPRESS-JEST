const fileType = require("filetype");

const config = require("../../../config");
const logger = require("../../../ultis/logger");

const validMineType = config.S3.validMineType;

function validetaImageFormat(req, res, next) {
  const mineTypeImageBody = req.get("Content-type");
  if (!validMineType.includes(mineTypeImageBody)) {
    logger.warn(`Image tyte is not acepted. Must be ${validMineType.join()}`);
    res
      .status(400)
      .send(`Image tyte is not acepted. Must be ${validMineType.join()}`);
    return;
  }
  const fileTypeImae = filetype(req.body);
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

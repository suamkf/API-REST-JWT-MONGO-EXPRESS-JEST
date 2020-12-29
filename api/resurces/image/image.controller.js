const AWS = require("aws-sdk");
const fs = require("fs").promises;

const config = require("../../../config");
const logger = require("../../../ultis/logger");

const S3Client = new AWS.S3({
  accessKeyId: config.S3.accessKeyId,
  secretAccessKey: config.S3.secretAccessKey,
});

async function saveImage(imageData, imageName) {
  const imageUrl = `${config.S3.folder}/${imageName}`;
  if (config.S3.saveOnS3) {
    await S3Client.putObject({
      Bucket: config.S3.bucket,
      Body: imageData,
      Key: imageUrl,
    }).promise();
    logger.info(
      `image save on S3 url: [http://${config.S3.bucket}.s3.amazonaws.com/${imageUrl}]`
    );
    return `http://${config.S3.bucket}.s3.amazonaws.com/${imageUrl}`;
  } else {
    logger.info(`Image save on server url: [/images/${imageName}] `);
    await fs.writeFile(
      `${__dirname}../../../public/images/${imageName}`,
      imageData
    );
    return `/images/${imageName}`;
  }
}

module.exports = {
    saveImage,
}
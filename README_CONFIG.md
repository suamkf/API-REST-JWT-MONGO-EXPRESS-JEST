# API-REST-JWT-MONGO-EXPRESS-JEST

*Create file .env to use ENV variables and write this info and save (S3_ACCESS_KEY_ID S3_SECRET_KEY are optionals)

MONGO_URI=(Strint)
SALT_OR_ROUNDS=(number default 10)
DEV_SECRET=(string)
PROD_SECRET=(string)
S3_ACCESS_KEY_ID=(string)
S3_SECRET_KEY=(string)

*CONFIGURATION
In config/index.js you have al the config info is you want to save your image in AWS S3 you have to put saveOnS3 in true and complete S3_ACCESS_KEY_ID S3_SECRET_KEY  
in your .env file.

*iF you want to run test file please run command npm install -D and then run npm run test
*Run command npm install to install all dependencies
*Run command npm start to starts the API

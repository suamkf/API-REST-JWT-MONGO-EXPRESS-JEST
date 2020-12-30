# API-REST-JWT-MONGO-EXPRESS-JEST

*Create file .env and wrhite this info and save (S3_ACCESS_KEY_ID S3_SECRET_KEY are optionals)

MONGO_URI=(Strint)
SALT_OR_ROUNDS=(number default 10)
DEV_SECRET=(string)
PROD_SECRET=(string)
S3_ACCESS_KEY_ID=(string)
S3_SECRET_KEY=(string)

*CONFIGURATION
In config/index.js you have al the config info is you want to save your image in AWS S3 you have to put saveOnS3 in true and complete S3_ACCESS_KEY_ID S3_SECRET_KEY  
in your .env file.

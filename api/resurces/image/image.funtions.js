const uuid = require("uuid");

function craateImageName (ext){
    return `${uuid()}.${ext}`
}

module.exports = {
    craateImageName,
}
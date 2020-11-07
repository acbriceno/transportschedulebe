'use strict'
var QRCode = require('qrcode')
var crypto = require("crypto");
class ScannableCodeGenerator {
  constructor(fileType){
    this.fileType = fileType
  }

  async generateCode(data){
    const path = "scannableMedia"
    const seperator = "/"
    const dot = "."
    const fileName =  crypto.randomBytes(15).toString('hex');
    const fullPath = path.concat(seperator).concat(fileName).concat(dot).concat(this.fileType)
    await QRCode.toFile(fullPath, data)
    return fullPath
  }


}

module.exports = ScannableCodeGenerator



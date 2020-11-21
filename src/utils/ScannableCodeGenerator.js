'use strict'
var QRCode = require('qrcode')
var crypto = require("crypto");
class ScannableCodeGenerator {
  constructor(fileType){
    this.fileType = fileType
  }

  async generateCode(data){
    try{
    const path = "src"
    const seperator = "/"
    const dot = "."
    const fileName =  await crypto.randomBytes(15).toString('hex');
    const fullPath = path.concat(seperator).concat("utils").concat(seperator).concat("scannableMedia").concat(seperator).concat(fileName).concat(dot).concat(this.fileType)
    //console.log(fullPath)
    await QRCode.toFile(fullPath, data)
    return fileName.concat(dot).concat(this.fileType)

    }
    catch(e){
      console.error(e)
    }
  }


}

module.exports = ScannableCodeGenerator





// const scan = async () =>{
//   try{
//     const scan = new ScannableCodeGenerator("png")

//     const scanned = await scan.generateCode("asdsadsad")
//     console.log(scanned)
//   }
//   catch(e){
//     console.error(e)
//   }
// }

// scan()

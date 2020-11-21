const { randomBytes, createCipheriv, createDecipheriv, createHash } = require('crypto')
const ScannableCodeGenerator = require('./ScannableCodeGenerator')
const workerpool = require('workerpool')

//* **************************************************************************
// @function: Encrypt data of type String with AES 256 CTR
// @param: text, key
//  text: String: text to encrypt using aes algorightm
//  key: String : 32 Bytes (256bit)
// @return: encryptedText
//* **************************************************************************
const encrypt256CTR = function (text, key) {
  const algorithm = 'AES-256-CTR'
  const iv = randomBytes(256 / 16)
  console.log('iv: ' + iv.toString('hex'))
  const cipher = createCipheriv(algorithm, key, iv)
  let encryptedText = iv.toString('hex')
  encryptedText += cipher.update(String(text), 'utf-8', 'hex')
  cipher.final('hex')
  return encryptedText
}

const decrypt256CTR = function (text, key) {
  const algorithm = 'AES-256-CTR'
  console.log(text)
  let iv = text.slice(0, 32)
  iv = Buffer.from(iv, 'hex')
  console.log('iv: ' + iv.toString('hex'))
  const decipher = createDecipheriv(algorithm, key, iv)
  const decryptedBuffer = decipher.update(text.slice(32), 'hex', 'utf-8')
  decipher.final('utf-8')
  return decryptedBuffer
}

//* **************************************************************************
// @param: obj, withHeldProperties, cryptoPayload
//  obj: Object : Object to be encrypted. Can contain objects as properties
//  withHeldProperties: [String] : properties not to be encrypted
//  cryptoPayload: Object: {
//  operatiion: String- defined either encrypt or decrypt
//  key: string - key to use in cryptographical algorithm
//  }
// @return: encryptedObj : Object Reflection of obj with properties excluding withHeldProperties being encrypted
//* **************************************************************************

const secureObject = function (obj, withHeldProperties, cryptoPayload) {
  const secureObj = {}
  for (var property in obj) {
    secureObj[property] = secureObject.operationsByType[typeof obj[property]](property, obj[property], withHeldProperties, cryptoPayload)
  }

  return secureObj
}

secureObject.operationsByType = {

  number: (propDef, property, withHeldProperties, cryptoPayload) => {
    return secureProperty(propDef, property, withHeldProperties, cryptoPayload)
  },
  boolean: (propDef, property, withHeldProperties, cryptoPayload) => {
    return secureProperty(propDef, property, withHeldProperties, cryptoPayload)
  },
  string: (propDef, property, withHeldProperties, cryptoPayload) => {
    return secureProperty(propDef, property, withHeldProperties, cryptoPayload)
  },
  object: (propDef, property, withHeldProperties, cryptoPayload) => {
    for (var withHeldProp of withHeldProperties) {
      if (withHeldProp === propDef) {
        return property
      }
    }
    if (property instanceof Array) {
      var propArray = []
      for (var prop of property) {
        propArray.push(secureObject.operationsByType[typeof prop](null, prop, withHeldProperties, cryptoPayload))
      }
      return propArray
    }
    return secureObject(property, withHeldProperties, cryptoPayload)
  }

}

const secureProperty = function (propDef, property, withHeldProperties, cryptoPayload) {
  for (var withHeldProp of withHeldProperties) {
    if (withHeldProp === propDef) {
      return property
    }
  }
  return secureProperty.crytoOperation[cryptoPayload.operation](property, cryptoPayload.key)
}

secureProperty.crytoOperation = {
  ENCRYPT: (property, key) => {
    return encrypt256CTR(property, key)
  },
  DECRYPT: (property, key) => {
    return decrypt256CTR(property, key)
  }
}

//* ***********************************************************
// @function: generateKey
// @param: text
// text: String : Text to generate key
// return: key: hashed(size 256bits) version of inputted text
//* ***********************************************************

const generateKey = function (text) {
  const hash = createHash('sha256')
  let hashedText = hash.update(text)
  hashedText = hash.digest('hex')
  return hashedText
}
console.log(generateKey('asdasdasdsad'))
//* ***********************************************************
// @function: generateEncryptedDataKeys
// @param: primary, secondary
// @return: encryptedDataKeys: Object: {primaryEncryptedDataKey, secondaryEncryptedDataKey}
//* ***********************************************************
const generateEncryptedDataKeys = async function (primary, secondary) {
  const datakey = await randomBytes(32).toString('hex')
  const primaryDerivedKey = await generateKey(primary)
  const secondaryDerivedKey = await generateKey(secondary)
  const encryptedDataKeys = {
    primaryEncryptedDataKey: await encrypt256CTR(datakey, Buffer.from(primaryDerivedKey, 'hex')),
    secondaryEncryptedDataKey: await encrypt256CTR(datakey, Buffer.from(secondaryDerivedKey, 'hex'))
  }
  return encryptedDataKeys
}


const generateScannableCode = async function (code){
  let scan = new ScannableCodeGenerator("png")
  let media = await scan.generateCode(code)
  return media
}

workerpool.worker({
  secureObject: secureObject,
  encrypt256: encrypt256CTR,
  decrypt256: decrypt256CTR,
  generateKey: generateKey,
  generateEncryptedDataKeys: generateEncryptedDataKeys,
  generateScannableCode: generateScannableCode
})

'use strict'
// const bcrypt = require('bcryptjs')
const workerpool = require('workerpool')
const path = require('path')
const pool = workerpool.pool()
const securePool = workerpool.pool(path.join(__dirname, '/secureobject.js'))

const validateHash = function (text, hash) {
  const bcrypt = require('bcryptjs').compare
  return new Promise((resolve, reject) => {
    bcrypt(text, hash, function (err, result) {
      if (err) {
        reject(err)
      } else {
        resolve(result)
      }
    })
  })
}

const validateHashWP = async function (text, hash) {
  return new Promise((resolve, reject) => {
    pool.exec(validateHash, [text, hash])
      .then(function (result) {
        resolve(result)
      })
      .catch(function (error) {
        reject(error)
      })
      .then(function () {
        pool.terminate()
      })
  })
}

const hashWithSalt = function (password) {
  const { genSalt, hash } = require('bcryptjs')

  return new Promise((resolve, reject) => {
    genSalt(10, function (err, salt) {
      if (err) { reject(err) }
      hash(password, salt, function (err, hash) {
        if (err) {
          reject(err)
        } else {
          resolve(hash)
        }
      })
    })
  })
}
const hashWP = async function (password) {
  return new Promise((resolve, reject) => {
    pool.exec(hashWithSalt, [password])
      .then(function (result) {
        resolve(result)
      })
      .catch(function (error) {
        reject(error)
      })
      .then(function () {
        pool.terminate()
      })
  })
}

const generateKeyWP = async function (text) {
  return new Promise((resolve, reject) => {
    securePool.exec('generateKey', [text])
      .then(function (result) {
        resolve(result)
      })
      .catch(function (error) {
        reject(error)
      })
      .then(function () {
        securePool.terminate()
      })
  })
}

const secureObjectWP = async function (obj, withHeldProperties, cryptoPayload) {
  return new Promise((resolve, reject) => {
    securePool.exec('secureObject', [obj, withHeldProperties, cryptoPayload])
      .then(function (result) {
        resolve(result)
      })
      .catch(function (error) {
        reject(error)
      })
      .then(function () {
        securePool.terminate()
      })
  })
}

const encrypt256WP = async function (text, key) {
  return new Promise((resolve, reject) => {
    securePool.exec('encrypt256', [text, key])
      .then(function (result) {
        resolve(result)
      })
      .catch(function (error) {
        reject(error)
      })
      .then(function () {
        securePool.terminate()
      })
  })
}

const decrypt256WP = async function (text, key) {
  return new Promise((resolve, reject) => {
    securePool.exec('decrypt256', [text, key])
      .then(function (result) {
        resolve(result)
      })
      .catch(function (error) {
        reject(error)
      })
      .then(function () {
        securePool.terminate()
      })
  })
}

const generateEncryptedDataKeysWP = async function (primary, secondary) {
  return new Promise((resolve, reject) => {
    securePool.exec('generateEncryptedDataKeys', [primary, secondary])
      .then(function (result) {
        resolve(result)
      })
      .catch(function (error) {
        reject(error)
      })
      .then(function () {
        securePool.terminate()
      })
  })
}


const generateScannableCodeWP = async function (code) {
  return new Promise((resolve, reject) => {
    securePool.exec('generateScannableCode', [code])
      .then(function (result) {
        resolve(result)
      })
      .catch(function (error) {
        reject(error)
      })
      .then(function () {
        securePool.terminate()
      })
  })
}

module.exports = {
  secureObjectWP,
  hashWP,
  validateHashWP,
  encrypt256WP,
  decrypt256WP,
  generateKeyWP,
  generateEncryptedDataKeysWP, 
  generateScannableCodeWP
}

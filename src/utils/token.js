'use strict'
const jwt = require('jsonwebtoken')
const config = require('../config')

const create = (userID, control, expiration) => new Promise((resolve, reject) => {
  const payload = {
    userID: userID,
    control: control
  }
  jwt.sign(
    {
      payload
    },
    config.JWT_SECRET,
    {
      expiresIn: expiration
    },
    (error, token) => {
      if (error) {
        return reject(error)
      }
      resolve(token)
    })
})

const getDecodedToken = token => new Promise((resolve, reject) => {
  console.log('Decoding')

  jwt.verify(token, config.JWT_SECRET, (error, decodedToken) => {
    if (error) {
      return reject(error)
    }

    if (!decodedToken.exp || !decodedToken.iat) {
      return reject(new Error('Token had no \'exp\' or \'iat\' payload'))
    }
    resolve(decodedToken)
  })
})

module.exports = {
  create,
  getDecodedToken
}

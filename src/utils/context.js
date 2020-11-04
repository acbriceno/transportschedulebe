'use strict'
const tokenUtil = require('./token')
const ObjectID = require('mongodb').ObjectID
const TOKEN_HEADER_NAME = 'x-token'
const getUser = async (req, User) => {
  // console.log(req)
  if (!req) {
    return null
  }
  const tokenHeader = req.get(TOKEN_HEADER_NAME)
  if (!tokenHeader) {
    return null
  }

  try {
    const decodedToken = await tokenUtil.getDecodedToken(tokenHeader)
    const payload = {
      _id: ObjectID(decodedToken.payload.userID)
    }

    return {
      decodedToken: decodedToken,
      user: await User.getOne(payload)
    }
  } catch (error) {
    return null
  }
}

module.exports = {
  getUser
}

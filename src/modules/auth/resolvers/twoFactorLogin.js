'use strict'
const { AuthenticationError } = require('apollo-server-express')
const tokenUtil = require('../../../utils/token')
const config = require('../../../config')
const ObjectID = require('mongodb').ObjectID
const twoFactorLogin = async (parent, args, context, info) => {
  try {
    const user = await context.user
    // console.log(user)
    if (!args.code || args.code !== user.user.twoFactorAuth.code) {
      throw new AuthenticationError('Non Matching Code')
    }
    const twoFactorUpdate = {
      'twoFactorAuth.code': ''
    }
    const userUpdateDBPayload = {
      _id: ObjectID(user.user._id)
    }
    const updatedUser = await context.datasource().users.updateOne(userUpdateDBPayload, twoFactorUpdate)
    console.log('Two auth')
    console.log(userUpdateDBPayload)
    console.log(user)
    if (updatedUser.modified > 0) { console.log('Two Auth Code Cleared/Updated') }
    const token = await tokenUtil.create(user.user._id, true, config.JWT_LIFE_TIME_TWO)
    return {
      user: {
        id: user.user._id,
        complete: user.user.complete
      },
      token,
      tokenExpiration: config.JWT_LIFE_TIME_TWO
    }
  } catch (error) {
    console.error(error)
  }
}

module.exports = twoFactorLogin

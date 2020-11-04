'use strict'

const { AuthenticationError } = require('apollo-server-express')
const tokenUtil = require('../../../utils/token')
// //const User = require('../../../models/user')
// const bcrypt = require('bcryptjs')
const config = require('../../../config')
const Secure = require('../../../utils/secure')
const TwoFactor = require('../../../utils/twoFactor')
const ObjectID = require('mongodb').ObjectID
const login = async (parent, args, context, info) => {
  try {
    console.log('Inside Login')
    const data = {
      email: args.email
    }
    const user = await context.datasource().users.getOne(data)
    console.log(user)
    if (user == null) {
      throw new AuthenticationError('Incorrect Credential')
    }

    const isPWDValid = await Secure.validateHashWP(args.password, user.password)
    if (!isPWDValid) {
      throw new AuthenticationError('Incorrect Credentials')
    }
    if (user.complete) {
      const twoFactorCode = await TwoFactor.generateTwoFactorCode()
      const userUpdateDBPayload = {
        _id: ObjectID(user._id)
      }
      const twoFactorUpdate = {
        'twoFactorAuth.code': twoFactorCode
      // 'twoFactorAuth.expiration:
      }
      await context.datasource().users.updateOne(userUpdateDBPayload, twoFactorUpdate)
    }
    const token = await tokenUtil.create(user._id, false, config.JWT_LIFE_TIME)
    return {
      user: {
        id: user._id,
        complete: user.complete
      },
      token,
      tokenExpiration: config.JWT_LIFE_TIME
    }
  } catch (error) {
    console.error(error)
  }
}
module.exports = login

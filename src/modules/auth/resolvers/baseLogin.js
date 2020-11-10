'use strict'

const { AuthenticationError } = require('apollo-server-express')
const tokenUtil = require('../../../utils/token')
// //const User = require('../../../models/user')
// const bcrypt = require('bcryptjs')
const config = require('../../../config')
const Secure = require('../../../utils/secure')
const TwoFactor = require('../../../utils/twoFactor')
const ObjectID = require('mongodb').ObjectID
const baseLogin = async (parent, args, context, info) => {
  try {
    console.log('Inside Login')
    console.log(args)
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

    const token = await tokenUtil.create(user._id, true, config.JWT_LIFE_TIME_TWO)
    return {
      user: {
        id: user._id,
        complete: user.complete,
        role: user.role,
        firstName: user.firstName, 
        lastName: user.lastName
      },
      token,
      tokenExpiration: config.JWT_LIFE_TIME_TWO
    }
  } catch (error) {
    console.error(error)
  }
}
module.exports = baseLogin

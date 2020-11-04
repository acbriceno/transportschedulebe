'use strict'
const me = require('./me')
const login = require('./login')
const signup = require('./signup')
const validateEmail = require('./validateEmail')
const twoFactorLogin = require('./twoFactorLogin')
const createBareBonesUser = require('./createBareBonesUser')
const completeBareBonesUser = require('./completeBareBonesUser')
const resolvers = {
  Query: {
    me
  },

  Mutation: {
    login,
    signup,
    validateEmail,
    twoFactorLogin,
    createBareBonesUser,
    completeBareBonesUser
  }
}

module.exports = resolvers

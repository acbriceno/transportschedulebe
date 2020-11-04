'use strict'
const isAuthenticated = require('./is-authenticated')
const distinctAccount = require('./DistinctAccount')
const firstAuth = require('./FirstAuth')
const isEmailVerified = require('./IsEmailVerified')
const isUserComplete = require('./isUserComplete')
module.exports = {
  typeDefs: [
    isAuthenticated.typeDef,
    distinctAccount.typeDef,
    firstAuth.typeDef,
    isEmailVerified.typeDef,
    isUserComplete.typeDef
  ],
  schemaDirectives: {
    isAuthenticated: isAuthenticated.directive,
    distinctAccount: distinctAccount.directive,
    firstAuth: firstAuth.directive,
    isEmailVerified: isEmailVerified.directive,
    isUserComplete: isUserComplete.directive
  }
}

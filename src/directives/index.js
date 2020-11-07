'use strict'
const isAuthenticated = require('./is-authenticated')
const distinctAccount = require('./DistinctAccount')
const firstAuth = require('./FirstAuth')
const isEmailVerified = require('./IsEmailVerified')
const isUserComplete = require('./isUserComplete')
const isRole = require('./isRole')
module.exports = {
  typeDefs: [
    isAuthenticated.typeDef,
    distinctAccount.typeDef,
    firstAuth.typeDef,
    isEmailVerified.typeDef,
    isUserComplete.typeDef,
    isRole.typeDef
  ],
  schemaDirectives: {
    isAuthenticated: isAuthenticated.directive,
    distinctAccount: distinctAccount.directive,
    firstAuth: firstAuth.directive,
    isEmailVerified: isEmailVerified.directive,
    isUserComplete: isUserComplete.directive,
    isCommuter: isRole.commuter.directive,
    isOperator: isRole.operator.directive,
    isAdmin: isRole.admin.directive
  }
}

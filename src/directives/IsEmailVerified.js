'use strict'
const { gql, SchemaDirectiveVisitor, AuthenticationError } = require('apollo-server-express')
const { defaultFieldResolver } = require('graphql')

const typeDef = gql`
  directive @isEmailVerified on FIELD_DEFINITION
`
class IsEmailVerifiedDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition (field) {
    const { resolve = defaultFieldResolver } = field
    field.resolve = async function (...args) {
      const user = await args[2].user
      if (!user) {
        throw new AuthenticationError('Not user')
      }
      if (!user.emailVerified) {
        throw new AuthenticationError('Email not verified')
      }
      return resolve.apply(this, args)
    }
  }
}

module.exports = {
  typeDef,
  directive: IsEmailVerifiedDirective
}

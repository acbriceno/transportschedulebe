'use strict'
const { gql, SchemaDirectiveVisitor, AuthenticationError } = require('apollo-server-express')
const { defaultFieldResolver } = require('graphql')

const typeDef = gql`
  directive @isUserComplete on FIELD_DEFINITION
`
class isUserCompleteDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition (field) {
    const { resolve = defaultFieldResolver } = field
    field.resolve = async function (...args) {
      const user = await args[2].user
      if (!user.user) {
        throw new AuthenticationError('Not user')
      }
      if (user.user.complete) {
        throw new AuthenticationError('Complete')
      }
      return resolve.apply(this, args)
    }
  }
}

module.exports = {
  typeDef,
  directive: isUserCompleteDirective
}

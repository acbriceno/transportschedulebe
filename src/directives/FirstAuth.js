'use strict'
const { gql, SchemaDirectiveVisitor, AuthenticationError } = require('apollo-server-express')
const { defaultFieldResolver } = require('graphql')
const typeDef = gql`
  directive @firstAuth on FIELD_DEFINITION
`

class FirstAuthDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition (field) {
    const { resolve = defaultFieldResolver } = field
    field.resolve = async function (...args) {
      console.log('Inside first auth')
      const context = args[2]
      const user = await context.user
      console.log(user)
      if (!context || !user || user.decodedToken.control) {
        throw new AuthenticationError('Not authenticated')
      }
      return resolve.apply(this, args)
    }
  }
}

module.exports = {
  typeDef,
  directive: FirstAuthDirective
}

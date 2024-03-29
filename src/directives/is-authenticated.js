'use strict'
const { gql, SchemaDirectiveVisitor, AuthenticationError } = require('apollo-server-express')
const { defaultFieldResolver } = require('graphql')
const typeDef = gql`
  directive @isAuthenticated on FIELD_DEFINITION
`

class IsAuthenticatedDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition (field) {
    const { resolve = defaultFieldResolver } = field
    field.resolve = async function (...args) {
      const context = args[2]
      console.log('Inside of @isAuthenticated Directive')

      const user = await context.user
      console.log(user)

      if(user == null){ throw new AuthenticationError('Not allowed')}
      if (!context || !user.user || user.decodedToken.control) {
        console.log("not authenticated")
        throw new AuthenticationError('Not allowed')
      }
      return resolve.apply(this, args)
    }
  }
}

module.exports = {
  typeDef,
  directive: IsAuthenticatedDirective
}

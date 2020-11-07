'use strict'
const { gql, SchemaDirectiveVisitor, AuthenticationError } = require('apollo-server-express')
const { defaultFieldResolver } = require('graphql')

const typeDef = gql`
  directive @isCommuter on FIELD_DEFINITION
  directive @isOperator on FIELD_DEFINITION
  directive @isAdmin on FIELD_DEFINITION
`
class isCommuterDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition (field) {
    const { resolve = defaultFieldResolver } = field
    field.resolve = async function (...args) {
      const user = await args[2].user
      if (!user.user) {
        throw new AuthenticationError('Not user')
      }
      if (user.user.role.role !== 'COMMUTER') {
        throw new AuthenticationError('Not Commuter')
      }
      return resolve.apply(this, args)
    }
  }
}
class isOperatorDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition (field) {
    const { resolve = defaultFieldResolver } = field
    field.resolve = async function (...args) {
      const user = await args[2].user
      if (!user.user) {
        throw new AuthenticationError('Not user')
      }
      if (user.user.role.role !== 'OPERATOR') {
        throw new AuthenticationError('Not Operator')
      }
      return resolve.apply(this, args)
    }
  }
}
class isAdminDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition (field) {
    const { resolve = defaultFieldResolver } = field
    field.resolve = async function (...args) {
      const user = await args[2].user
      if (!user.user) {
        throw new AuthenticationError('Not user')
      }
      if (user.user.role.role !== 'ADMIN') {
        throw new AuthenticationError('Not Allowed in Here. Tsk!')
      }
      return resolve.apply(this, args)
    }
  }
}





module.exports = {
  typeDef,
  commuter: {
    directive: isCommuterDirective
  },
  operator: {
    directive: isOperatorDirective
  },
  admin: {
    directive: isAdminDirective
  }
}


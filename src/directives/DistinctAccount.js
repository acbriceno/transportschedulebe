'use strict'
const { gql, SchemaDirectiveVisitor } = require('apollo-server-express')
const { defaultFieldResolver } = require('graphql')

const typeDef = gql`
  directive @distinctAccount on ARGUMENT_DEFINITION | ENUM_VALUE
`
class DistinctAccountDirective extends SchemaDirectiveVisitor {
  visitArgumentDefinition (argument, { field }) {
    console.log(this)
    const { resolve = defaultFieldResolver } = field
    field.resolve = async function (...args) {
      console.log('Inside @distinctAccount Directive')
      console.log(args[2])
      return resolve.apply(this, args)
      //   return id
    }
  }

  visitEnumValue (value) {
    console.log(value)
  }
}

module.exports = {
  typeDef,
  directive: DistinctAccountDirective
}

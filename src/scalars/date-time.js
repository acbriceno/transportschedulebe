const { GraphQLScalarType, Kind } = require('graphql')
const { gql } = require('apollo-server-express')

const typeDef = gql`
  scalar DateTime
  `

const DateTime = new GraphQLScalarType({
  name: 'DateTime',
  description: 'A DateTime representation in ISO Format',
  parseValue (value) {
    return value
  },
  serialize (value) {
    return value
  },
  parseLiteral (ast) {
    if (ast.kind === Kind.INT) {
      return new Date(parseInt(ast.value))
    }
  }
})

module.exports = {
  typeDef,
  resolvers: {
    DateTime
  }
}

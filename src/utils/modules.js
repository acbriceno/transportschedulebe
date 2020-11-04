'use strict'

const { gql, makeExecutableSchema } = require('apollo-server-express')
const deepmerge = require('deepmerge')

const directives = require('../directives')
const scalars = require('../scalars')
// console.log(scalars)
const globalTypeDefs = gql`
  type Query
  type Mutation
`
// console.log(globalTypeDefs)

module.exports = ({
  modules
}) => {
  let typeDefs = [
    globalTypeDefs,
    ...scalars.typeDefs,
    ...directives.typeDefs
  ]

  let resolvers = {
    ...scalars.resolvers
  }

  modules.forEach(module => {
    typeDefs = [
      ...typeDefs,
      ...module.typeDefs
    ]

    resolvers = deepmerge(resolvers, module.resolvers)
  })

  return makeExecutableSchema({
    typeDefs,
    resolvers,
    schemaDirectives: {
      ...directives.schemaDirectives
    }
  })
}

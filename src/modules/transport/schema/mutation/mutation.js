const { gql } = require('apollo-server-express')

const typeDefs = gql`

extend type Mutation {
  createRoute(route: RouteInput! ): Response!
  createStop(stop: StopInput!): Response!
  createOperator(operator: OperatorInput!): Response!
  createOperatorRoute(operatorRoute: OperatorRouteInput!): Response!
  createPass(pass: PassInput!): Response!
}
`

module.exports = {
  typeDefs
}

const { gql } = require('apollo-server-express')

const typeDefs = gql`

extend type Mutation {
  createStop(stop: StopInput!): Response! @isAdmin @isAuthenticated
  createOperator(operator: OperatorInput!): Response! @isOperator @isAuthenticated
  createOperatorRoute(operatorRoute: OperatorRouteInput!): Response! @isOperator @isAuthenticated
  createPass(pass: PassInput!): Response! @isCommuter @isAuthenticated
  createCommuter(commuter: CommuterInput!): Response! @isCommuter @isAuthenticated
  scanPass(passId: String!): Response @isOperator @isAuthenticated 
}
`

module.exports = {
  typeDefs
}

'use strict'

const { gql } = require('apollo-server-express')

const typeDefs = gql`
  
  extend type Query {
  stop(id: String!): Response!
  stops: Response!
  operatorRoute(id: String!): Response!
  operatorRoutes: Response! @isOperator @isAuthenticated
  activeOperatorRoutes: Response!
  pass(id: String!): Response!
  commuter: Response! @isCommuter @isAuthenticated
  operator: Response! @isOperator @isAuthenticated
  }

`

module.exports = {
  typeDefs
}

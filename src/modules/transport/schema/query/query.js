'use strict'

const { gql } = require('apollo-server-express')

const typeDefs = gql`
  
  extend type Query {
  route(id: String!): Response!
  routes: Response!
  stop(id: String!): Response!
  stops: Response!
  operatorRoute(id: String!): Response!
  operatorRoutes: Response!
  pass(id: String!): Response!
  passes: Response!
  commuter: Response!
  }

`

module.exports = {
  typeDefs
}

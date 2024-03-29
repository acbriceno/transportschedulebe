'use strict'

const { gql } = require('apollo-server-express')

const typeDefs = gql`
  
  extend type Query {
  me: User @isAuthenticated
  }

`

module.exports = {
  typeDefs
}

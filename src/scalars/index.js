'use strict'

const DateTime = require('./date-time')

// var typeDefs = module.exports = [DateTime.typeDef]

// var resolvers = module.exports = {
//    ...DateTime.resolvers
//  }

module.exports = {
  typeDefs: [
    DateTime.typeDef
  ],
  resolvers: {
    ...DateTime.resolvers
  }
}

'use strict'
const schema = require('./schema/schema')
const query = require('./query/query').typeDefs
const mutation = require('./mutation/mutation').typeDefs

const schemaArray = [schema, query, mutation]
module.exports = schemaArray

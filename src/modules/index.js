'use strict'
const makeExecutableSchemaFromModules = require('../utils/modules')

const auth = require('./auth')
const transport = require('./transport')
module.exports = makeExecutableSchemaFromModules({
  modules: [
    auth,
    transport

  ]
})

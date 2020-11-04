'use strict'

const { MongoDataSource } = require('./../datasource')

class Accounts extends MongoDataSource {
  initialize () {
    super.initialize()
  }
}

module.exports = Accounts

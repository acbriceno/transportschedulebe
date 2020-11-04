'use strict'

const {MongoDataSource} = require('./../datasource')

class Search extends MongoDataSource {
  constructor(collection){
    super(collection)
  }

  initialize(){
    super.initialize()
  }
}

module.exports = Search

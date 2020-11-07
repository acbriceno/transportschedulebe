'use strict'

const ObjectID = require('mongodb').ObjectID
const { MongoDataSource } = require('./../datasource')

class Commuter extends MongoDataSource{
 constructor(collection){
    super(collection)
  }

  initialize(){
    super.initialize()
  }
  
  async createObjDBPayload(args){
    const commuter = {
      passes: [] 
    }
    
    return commuter
  }

  async createObjGQLPayload(args) {
    const commuter = {
      id: args._id,
      passes: args.passes
    }
    return commuter
  }

}


module.exports = Commuter

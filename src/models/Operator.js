'use strict'
const ObjectID = require('mongodb').ObjectID
const { MongoDataSource } = require('./../datasource')

class Operator extends MongoDataSource {
  constructor(collection){
    super(collection)
  }

  initialize(){
    super.initialize()
  }

  async createObjDBPayload(args) {
    const operator = {
      name: args.name,
      licenseNo: args.licenseNo,
      scannedPasses: []
    }
    return operator
  }
  
  async createObjGQLPayload(args) {
    const operator = {
      id: args._id,
      name: args.name,
      licenseNo: args.licenseNo,
      scannedPasses: args.scannedPasses
    }
  }
  
}

module.exports = Operator


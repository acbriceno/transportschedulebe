'use strict'
const ObjectID = require('mongodb').ObjectID
const { MongoDataSource } = require('./../datasource')

class Stop extends MongoDataSource {
  constructor(collection){
    super(collection)
  }


  initialize(){
    super.initialize()
  }

  async createObjDBPayload(args) {
    const stop = {
      lat: args.lat,
      lon: args.lon, 
      name: args.name,
      active: true,
      location: args.location,
      type: args.type
    }

    return stop
  }
  
  async createObjGQLPayload(args){
    const stop = {
      id: args._id,
      lat: args.lat,
      lon: args.lon,
      name: args.name,
      active: args.active,
      location: args.location,
      type: args.type
    }
    return stop
  }

}

module.exports = Stop

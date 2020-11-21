'use strict'

const ObjectID = require('mongodb').ObjectID
const { MongoDataSource } = require('./../datasource')

class OperatorRoute extends MongoDataSource{
  constructor(collection){
    super(collection)
  }

  initialize(){
    super.initialize()
  }

  async createObjDBPayload(args){
    const operatorRoute = {
      route: args.route,
      schedule: args.schedule,
      routeType: args.routeType,
      intermediaries: args.intermediaries,
      operatorId: args.operatorId,
      active: true
    }
    return operatorRoute
  }

  async createObjGQLPayload(args){
    const operatorRoute = {
      id: args._id,
      route: args.route,
      schedule: args.schedule,
      routeType: args.routeType,
      intermediaries: args.intermediaries,
      operatorId: args.operatorId,
      active: args.active
    }
    return operatorRoute
  }
}

module.exports = OperatorRoute

'use strict'
const ObjectID = require('mongodb').ObjectID
const { MongoDataSource } = require('./../datasource')

class Pass extends MongoDataSource{
  constructor(collection){
    super(collection)
  }

  initialize(){
    super.initialize()
  }

  async createObjDBPayload(args){
    let emptyArg = ""
    const pass = {
      redeemed: false, 
      mediaPath: emptyArg,
      value: args.value,
      purchaseDate: Date.now(),
      route: args.route,
      routeType: args.routeType,
      redeemDate: Date.now()
    }
    return pass
  }

    async createObjGQLPayload(args){
      const pass = {
        id: args._id,
        mediaPath: args.mediaPath,
        value: args.value,
        route: args.route,
        routeType: args.routeType,
        purchaseDate: args.purchaseDate,
        redeemed: args.redeemed,
        redeemDate: args.redeemDate
      }
      return pass
    }

}

module.exports = Pass

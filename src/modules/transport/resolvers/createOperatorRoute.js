'use strict'
const Response = require('../../../utils/Response')
const TransportManager = require('../../../models/TransportManager')
const createOperatorRoute = async(parent, args, context, info)=>{
  try{
    const transportManager = new TransportManager()
    let operatorRouteResponse = await transportManager.createOperatorRoute(args.operatorRoute, context)


    return operatorRouteResponse.status ?  Response.getResponse(new Map([['operatorRoute', operatorRouteResponse.operator ]]), true) : Response.getResponse(new Map([['operatorRoute', null]]), false)

    
  }catch(error){
    console.error(error)
  }
}

module.exports = createOperatorRoute

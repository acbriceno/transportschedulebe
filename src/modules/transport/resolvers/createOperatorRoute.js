'use strict'
const Response = require('../../../utils/Response')
const TransportManager = require('../../../models/TransportManager')
const createOperatorRoute = async(parent, args, context, info)=>{
  try{
    const transportManager = new TransportManager()
    let operatorRouteResponse = await transportManager.createOperatorRoute(args.operatorRoute, context)
    const operatorRouteRes = operatorRouteResponse.status ? new Response(operatorRouteResponse.operatorRoute, true, "operatorRoute") : new Response(null, false, "operatorRoute")
    const operatorRouteReturn = await operatorRouteRes.getResponse()
    return operatorRouteReturn

   
    
  }catch(error){
    console.error(error)
  }
}

module.exports = createOperatorRoute

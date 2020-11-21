'use strict'
const Response = require('../../../utils/Response')
const TransportManager = require('../../../models/TransportManager')
const createOperatorRoute = async(parent, args, context, info)=>{
  try{
    console.log(args)
    let user = await context.user
    let operatorRouteArgs = args.operatorRoute
    operatorRouteArgs["operatorId"] = user.user.role.id[0]
    const transportManager = new TransportManager()
    let operatorRouteResponse = await transportManager.createOperatorRoute(operatorRouteArgs, context)
    const operatorRouteRes = operatorRouteResponse.status ? new Response(operatorRouteResponse.operatorRoute, true, "operatorRoute") : new Response(null, false, "operatorRoute")
    const operatorRouteReturn = await operatorRouteRes.getResponse()
    return operatorRouteReturn

   
    
  }catch(error){
    console.error(error)
  }
}

module.exports = createOperatorRoute

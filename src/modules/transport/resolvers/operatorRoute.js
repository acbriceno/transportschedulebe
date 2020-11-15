'use strict'
const Response = require('../../../utils/Response')
const TransportManager = require('../../../models/TransportManager')
const operatorRoute = async(parent, args, context, info)=>{
  try{
    const transportManager = new TransportManager()
    let operatorRouteResponse = await transportManager.getOperatorRoute(args.id, context)
    const operatorRouteRes = operatorRouteResponse.status ? new Response(operatorRouteResponse.operatorRoute, true, "operatorRoute") : new Response(null, false, "operatorRoute")
    const operatorRouteReturn = await operatorRouteRes.getResponse()
    return operatorRouteReturn
    

    
  }catch(error){
    console.error(error)
  }
}

const operatorRoutes = async(parent, args, context, info)=>{
  try{
    let user = context.user
    if(user.user == null){
      return Response.getResponse(new Map([['operatorRoutes', [] ]]), false)
    }
    const transportManager = new TransportManager()
    let operatorRoutesResponse = await transportManager.getOperatorRoutes(user.user.role.id[0], context)
    const operatorRoutesRes = operatorRoutesResponse.status ? new Response(operatorRoutesResponse.operatorRoutes, true, "operatorRoutes") : new Response([], false, "operatorRoutes")
    const operatorRoutesReturn = await operatorRoutesRes.getResponse()
    return operatorRoutesReturn    
  }catch(error){
    console.error(error)
  }
}

const activeOperatorRoutes = async(parent, args, context, info)=>{
  try{
    const transportManager = new TransportManager()
    let operatorRoutesResponse = await transportManager.getActiveOperatorRoutes(context)
    const operatorRoutesRes = operatorRoutesResponse.status ? new Response(operatorRoutesResponse.operatorRoutes, true, "operatorRoutes") : new Response([], false, "operatorRoutes")
    const operatorRoutesReturn = await operatorRoutesRes.getResponse()
    return operatorRoutesReturn     
  }catch(error){
    console.error(error)
  }
}

module.exports = {
  operatorRoute: operatorRoute,
  operatorRoutes: operatorRoutes,
  activeOperatorRoutes: activeOperatorRoutes
}

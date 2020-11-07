'use strict'
const Response = require('../../../utils/Response')
const TransportManager = require('../../../models/TransportManager')
const operatorRoute = async(parent, args, context, info)=>{
  try{
    const transportManager = new TransportManager()
    let operatorRouteResponse = await transportManager.getOperatorRoute(args.id, context)
    return operatorRouteResponse.status ?  Response.getResponse(new Map([['operatorRoute', operatorRouteResponse.operatorRoute ]]), true) : Response.getResponse(new Map([['operatorRoute', null]]), false)


    
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
    return operatorRoutesResponse.status ?  Response.getResponse(new Map([['operatorRoutes', operatorRoutesResponse.operatorRoute ]]), true) : Response.getResponse(new Map([['operatorRoutes', []]]), false)


    
  }catch(error){
    console.error(error)
  }
}

const activeOperatorRoutes = async(parent, args, context, info)=>{
  try{
    const transportManager = new TransportManager()
    let operatorRoutesResponse = await transportManager.getActiveOperatorRoutes(context)
    return operatorRoutesResponse.status ?  Response.getResponse(new Map([['operatorRoutes', operatorRoutesResponse.operatorRoutes ]]), true) : Response.getResponse(new Map([['operatorRoutes', []]]), false)


    
  }catch(error){
    console.error(error)
  }
}

module.exports = {
  operatorRoute: operatorRoute,
  operatorRoutes: operatorRoutes,
  activeOperatorRoutes: activeOperatorRoutes
}

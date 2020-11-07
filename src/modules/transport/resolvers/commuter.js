'use strict'

const TransportManager = require('../../../models/TransportManager')
const Response = require('../../../utils/Response')
const commuter = async(parent, args, context, info)=>{
  try{

    let user = await context.user
    if(user.user === null){
      return Response.getResponse(new Map([['commuter', null]]), false) 
    }
    const transportManager = new TransportManager()
    let commuterResponse = await transportManager.getCommuter(user.user.role.id[0], context)

    return commuterResponse.status ?  Response.getResponse(new Map([['commuter', commuterResponse.commuter ]]), true) : Response.getResponse(new Map([['commuter', null]]), false)
    
  }catch(error){
    console.error(error)
  }
}

module.exports = {
  commuter: commuter
}

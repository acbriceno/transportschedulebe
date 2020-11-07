'use strict'

const TransportManager = require('../../../models/TransportManager')
const Response = require('../../../utils/Response')
const createCommuter = async(parent, args, context, info)=>{
  try{
    const transportManager = new TransportManager()
    let commuterResponse = await transportManager.createCommuter(args.commuter, context)

    return commuterResponse.status ?  Response.getResponse(new Map([['commuter', commuterResponse.commuter ]]), true) : Response.getResponse(new Map([['commuter', null]]), false)
    
  }catch(error){
    console.error(error)
  }
}

module.exports = createCommuter

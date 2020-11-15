'use strict'

const TransportManager = require('../../../models/TransportManager')
const Response = require('../../../utils/Response')

const createStop = async(parent, args, context, info)=>{
  try{
    const transportManager = new TransportManager()
    let stopResponse = await transportManager.createStop(args.stop, context)
    let stopRes = stopResponse.status ?  new Response(stopResponse.stop, stopResponse.status, "stop") : new Response(null, stopResponse.status, "stop")
    let responseReturn =  stopRes.getResponse()
    return responseReturn

    
  }catch(error){
    console.error(error)
  }
}

module.exports = createStop

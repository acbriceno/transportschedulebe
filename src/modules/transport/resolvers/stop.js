'use strict'
const Response = require('../../../utils/Response')
const TransportManager = require('../../../models/TransportManager')
const stop = async(parent, args, context, info)=>{
  try{
    const transportManager = new TransportManager()
    let stopResponse = await transportManager.getStop(args.id, context)
    return stopResponse.status ?  Response.getResponse(new Map([['stop', stopResponse.stop ]]), true) : Response.getResponse(new Map([['stop', null]]), false)


    
  }catch(error){
    console.error(error)
  }
}

const stops = async(parent, args, context, info)=>{
  try{
    const transportManager = new TransportManager()
    let stopsResponse = await transportManager.getStops(context)
    return stopsResponse.status ?  Response.getResponse(new Map([['stops', stopsResponse.stops ]]), true) : Response.getResponse(new Map([['stops', []]]), false)





  }catch(error){
    console.error(error)
  }
}





module.exports = {
  stop: stop,
  stops: stops
}

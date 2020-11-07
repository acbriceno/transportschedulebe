'use strict'

const TransportManager = require('../../../models/TransportManager')
const Response = require('../../../utils/Response')

const createStop = async(parent, args, context, info)=>{
  try{
    const transportManager = new TransportManager()
    let stopResponse = await transportManager.createStop(args.stop, context)
    return stopResponse.status ?  Response.getResponse(new Map([['stop', stopResponse.stop ]]), true) : Response.getResponse(new Map([['stop', null]]), false)


    
  }catch(error){
    console.error(error)
  }
}

module.exports = createStop

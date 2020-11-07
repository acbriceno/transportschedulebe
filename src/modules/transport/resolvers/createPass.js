'use strict'
const Response = require('../../../utils/Response')
const TransportManager = require('../../../models/TransportManager')
const createPass = async(parent, args, context, info)=>{
  try{
    const transportManager = new TransportManager()
    let passResponse = await transportManager.createPass(args.pass, context)

    return passResponse.status ?  Response.getResponse(new Map([['pass', passResponse.pass ]]), true) : Response.getResponse(new Map([['pass', null]]), false)
    
  }catch(error){
    console.error(error)
  }
}

module.exports = createPass

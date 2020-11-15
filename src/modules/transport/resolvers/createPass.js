'use strict'
const Response = require('../../../utils/Response')
const TransportManager = require('../../../models/TransportManager')
const createPass = async(parent, args, context, info)=>{
  try{
    const transportManager = new TransportManager()
    let passResponse = await transportManager.createPass(args.pass, context)
    let passRes = passResponse.status ? new Response(passResponse.pass, true, "pass") : new Response(null, false, "pass")
    const passReturn = passRes.getResponse()
    return passReturn
  }catch(error){
    console.error(error)
  }
}

module.exports = createPass

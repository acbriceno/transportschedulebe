'use strict'

const TransportManager = require('../../../models/TransportManager')
const Response = require('../../../utils/Response')
const createCommuter = async(parent, args, context, info)=>{
  try{
    const transportManager = new TransportManager()
    let commuterResponse = await transportManager.createCommuter(args.commuter, context)
    let commuterRes = commuterResponse.status ?  new Response(commuterResponse.commuter, true, "commuter") : new Response(null, false, "commuter")
    let commuterReturn = await commuterRes.getResponse()
    return commuterReturn
  }catch(error){
    console.error(error)
  }
}

module.exports = createCommuter

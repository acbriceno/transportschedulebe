'use strict'

const { separateOperations } = require('graphql')
const TransportManager = require('../../../models/TransportManager')
const Response = require('../../../utils/Response')
const commuter = async(parent, args, context, info)=>{
  try{

    let user = await context.user
    if(user.user === null){
      let userRes = new Response(null, false, "commuter")
      let responseReturn = await userRes.getResponse()
      return responseReturn 
     
    }
    const transportManager = new TransportManager()
    let commuterResponse = await transportManager.getCommuter(user.user.role.id[0], context)

    let commuterRes = commuterResponse.status ?  new Response(commuterResponse.commuter, true, "commuter") : new Response(null, false, "commuter")
    let commuterReturn = await commuterRes.getResponse()
    return commuterReturn
    
  }catch(error){
    console.error(error)
  }
}

module.exports = {
  commuter: commuter
}

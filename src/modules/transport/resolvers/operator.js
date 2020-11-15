'use strict'

const TransportManager = require('../../../models/TransportManager')
const Response = require('../../../utils/Response')
const operator = async(parent, args, context, info)=>{
  try{

    let user = await context.user
    if(user.user === null){
      l

      let userRes = new Response(null, false, "operator")
      let responseReturn = await userRes.getResponse()
      return responseReturn 
    }
    const transportManager = new TransportManager()
    let operatorResponse = await transportManager.getOperator(user.user.role.id[0], context)
    const operatorRes = operatorResponse.status ? new Response(operatorResponse.operator, true, "operator") : new Response(null, false, "operator")
    const operatorReturn = await operatorRes.getResponse()
    return operatorReturn 
  }catch(error){
    console.error(error)
  }
}

module.exports = {
  operator: operator
}

'use strict'

const TransportManager = require('../../../models/TransportManager')
const Response = require('../../../utils/Response')
const createOperator = async(parent, args, context, info)=>{
  try{
    const transportManager = new TransportManager()
    let operatorResponse = await transportManager.createOperator(args.operator, context)
    
    const operatorRes = operatorResponse.status ? new Response(operatorResponse.operator, true, "operator") : new Response(null, false, "operator")
    const operatorReturn = await operatorRes.getResponse()
    return operatorReturn 

    
  }catch(error){
    console.error(error)
  }
}

module.exports = createOperator

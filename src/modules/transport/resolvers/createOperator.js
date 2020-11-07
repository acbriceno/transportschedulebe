'use strict'

const TransportManager = require('../../../models/TransportManager')
const Response = require('../../../utils/Response')
const createOperator = async(parent, args, context, info)=>{
  try{
    const transportManager = new TransportManager()
    let operatorResponse = await transportManager.createOperator(args.operator, context)
    
    return operatorResponse.status ?  Response.getResponse(new Map([['operator', operatorResponse.operator ]]), true) : Response.getResponse(new Map([['operator', null]]), false)

    
  }catch(error){
    console.error(error)
  }
}

module.exports = createOperator

'use strict'

const TransportManager = require('../../../models/TransportManager')
const Response = require('../../../utils/Response')
const operator = async(parent, args, context, info)=>{
  try{

    let user = await context.user
    if(user.user === null){
      return Response.getResponse(new Map([['operator', null]]), false) 
    }
    const transportManager = new TransportManager()
    let operatorResponse = await transportManager.getOperator(user.user.role.id[0], context)

    return operatorResponse.status ?  Response.getResponse(new Map([['operator', operatorResponse.operator ]]), true) : Response.getResponse(new Map([['operator', null]]), false)
    
  }catch(error){
    console.error(error)
  }
}

module.exports = {
  operator: operator
}

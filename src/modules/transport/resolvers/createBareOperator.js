'use strict'

const TransportManager = require('../../../models/TransportManager')
const Response = require('../../../utils/Response')
const DBGQLConnector = require('../../../utils/DBGQLConnector')
const createBareOperator = async(parent, args, context, info)=>{
  try{
    console.log(args)
    const transportManager = new TransportManager()
    const userArguments = args.user
    const userObjDBPayload = await context.datasource().users.createBareBonesObjDBPayload(userArguments)// user object  for db storage
    const user = await context.datasource().users.create(userObjDBPayload)
    const userObjGQLPayload = await context.datasource().users.createBareBonesObjGQLPayload(user.ops[0])
    
    let operatorResponse = await transportManager.createOperator(args.operator, context)
    console.log(operatorResponse)
  if(!operatorResponse.status){
    console.log(12)
    let operatorRoleRes = new Response(null, false, "operatorRole")
    let operatorRoleReturn = await operatorRoleRes.getResponse()
    return operatorRoleReturn 
    
  }

    const updatePayload = await context.datasource().users.getRoleUpdatePayload(userObjGQLPayload.id, operatorResponse.operator.id)
    let update = await DBGQLConnector.dbUpdateOneArray('USER', updatePayload, context)
    let bareOperator = args.user.role.role
    
    console.log(update)
    
    const updateRes = update.length !== 0 ? new Response(bareOperator, true, "operatorRole") : new Response(null, false, "operatorRole")
    const updateReturn  = await updateRes.getResponse()
    return updateReturn     
  }catch(error){
    console.error(error)
  }
}

module.exports = createBareOperator

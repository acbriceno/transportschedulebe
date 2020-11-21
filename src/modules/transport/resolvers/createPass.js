'use strict'
const Response = require('../../../utils/Response')
const TransportManager = require('../../../models/TransportManager')
const createPass = async(parent, args, context, info)=>{
  try{

    const user = await context.user
    let argument = args.pass
    argument['roleId'] = user.user.role.id[0]
    const transportManager = new TransportManager()
    let passResponse = await transportManager.createPass(argument, context)
    let passRes = passResponse.status ? new Response(passResponse.pass, true, "pass") : new Response(null, false, "pass")
    const passReturn = passRes.getResponse()
    console.log(passReturn)
    return passReturn
  }catch(error){
    console.error(error)
  }
}

module.exports = createPass

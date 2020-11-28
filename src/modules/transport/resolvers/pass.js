'use strict'

const TransportManager = require('../../../models/TransportManager')
const Response = require('../../../utils/Response')
const pass = async(parent, args, context, info)=>{
  try{
    console.log(args)
    const transportManager = new TransportManager()
    let passResponse = await transportManager.getPass(args.id, context)
    console.log(passResponse)
    let passRes = passResponse.status ? new Response(passResponse.pass, true, "pass") : new Response(null, false, "pass")
    const passReturn = await passRes.getResponse()
    console.log(passReturn)
    return passReturn
    
  }catch(error){
    console.error(error)
  }
}


const scanPass = async(parent, args, context, info)=> {
  try{
    const user = context.user
    if(user.user === null){ return Response.getResponse(new Map([['pass', null]]), false) }
    const transportManager = new TransportManager()
    let scannedPassResponse = await transportManager.scanPass(args.passId,args.operatorRouteId, args.scanningStopId, user.user.role.id[0], context)
    const scannedPassRes = scannedPassResponse.status ? new Response(scannedPassResponse.pass, true, "pass") : new Response(null, false, "pass")
    const scannedPassReturn = await scannedPassRes.getResponse()
    console.log(scannedPassReturn)
    return scannedPassReturn

  }catch(error){
    console.error(error)
  }
}

module.exports = {
  pass: pass,
  scanPass: scanPass

}

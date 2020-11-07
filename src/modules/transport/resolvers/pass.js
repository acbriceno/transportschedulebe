'use strict'

const TransportManager = require('../../../models/TransportManager')
const Response = require('../../../utils/Response')
const pass = async(parent, args, context, info)=>{
  try{

    const transportManager = new TransportManager()
    let passResponse = await transportManager.getPass(args.id, context)

    return passResponse.status ?  Response.getResponse(new Map([['pass', passResponse.pass ]]), true) : Response.getResponse(new Map([['pass', null]]), false)
    
  }catch(error){
    console.error(error)
  }
}


const scanPass = async(parent, args, context, info)=> {
  try{
    const user = context.user
    if(user.user === null){ return Response.getResponse(new Map([['pass', null]]), false) }
    const transportManager = new TransportManager()
    let scannedPassResponse = await transportManager.scanPass(args.passId, user.user.role.id[0], context)
    return scannedPassResponse.status ?  Response.getResponse(new Map([['pass', null ]]), true) : Response.getResponse(new Map([['pass', null]]), false)
    

  }catch(error){
    console.error(error)
  }
}

module.exports = {
  pass: pass,
  scanPass: scanPass

}

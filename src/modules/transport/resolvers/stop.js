'use strict'
const Response = require('../../../utils/Response')


const TransportManager = require('../../../models/TransportManager')
const stop = async(parent, args, context, info)=>{
  try{
    const transportManager = new TransportManager()
    let stopResponse = await transportManager.getStop(args.id, context)
   
    let stopRes = stopResponse.status ?  new Response(stopResponse.stop, stopResponse.status, "stop") : new Response(null, stopResponse.status, "stop")
    let responseReturn =  stopRes.getResponse()
    return responseReturn
    
    
  }catch(error){
    console.error(error)
  }
}

const stops = async(parent, args, context, info)=>{
  try{
    const transportManager = new TransportManager()
    let stopsResponse = await transportManager.getStops(context)
    console.log(stopsResponse)
   let stopsRes = stopsResponse.status ?  new Response(stopsResponse.stops, stopsResponse.status, "stops") : new Response([], stopsResponse.status, "stops")
    let responseReturn =  await stopsRes.getResponse()
    console.log(responseReturn)
    return responseReturn
  }catch(error){
    console.error(error)
  }
}

// class ResponseT {
//   constructor(param, mode, name){
//     this.param = param
//     this.mode = mode
//     this.code = 0
//     this.name = name
//   }

//   async getResponse(){
//   try{
//     let params = new Map([[this.name, this.param]])
//     const response = this.getStructure()
//     for (var [param, value] of params) {
//      response[param] = value
//     }
//     return response
//     }catch(e){
//       console.error(e)
//   }

//   }
//   getStructure() {
//     return {
//       status: this.mode,
//       code: 0
//     }
//   }
//   getParam(){ return this.param }
//   getMode() { return this.mode }


// }



module.exports = {
  stop: stop,
  stops: stops
}

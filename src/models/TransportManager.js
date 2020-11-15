'use strict'

const DBGQLConnector = require('../utils/DBGQLConnector')
const ScannableCodeGenerator = require('../utils/ScannableCodeGenerator')
const ObjectID = require('mongodb').ObjectID
class TransportManager {
  constructor(){
    this.stopModel = "STOP"
    this.operatorModel = "OPERATOR"
    this.commuterModel = "COMMUTER"
    this.passModel = "PASS"
    this.operatorRouteModel = "OPERATORROUTE"
    this.dbId = "_id"
  }

  async createStop(args, context){
    try{
      let stop = await DBGQLConnector.createDBObj(this.stopModel, args, context)
      if(stop == null){return {status: false}}
      return {
        status: true, 
        stop: stop
      }
    }catch(error){
      console.error(error)
    }
  }

  async getStop(id, context){
    try{
    let stop = await DBGQLConnector.dbFindWithTag(this.stopModel,this.dbId, id, context)
    if(stop == null){return {status: false}}
    return {
      status: true, 
      stop: stop
    }
    }catch(error){
      console.error(error)
    }
  }

  async getStops(context){
    try{
      console.log("getting stops")
      let param = "active"
      let stops = await DBGQLConnector.dbFindAllWithTag(this.stopModel, param, true, context)
      if(stops == null){return {status: false}}
      return {
        status: true, 
        stops: stops
      }
    }catch(error){
      console.error(error)
    }
  }

  async updateStop(stopId, stopUpdate, context ){
    try{
      let update = await DBGQLConnector.dbUpdateOne(this.stopModel, this.dbId, stopId, stopUpdate, context)
      return update
    }catch(error){
      console.error(error)
    }
  }

  async deleteStop(stopId, context){
    try{

      let deleted = await DBGQLConnector.deleteOneById(this.stopModel, operatorId, context)
      return deleted
    }catch(error){
      console.error(error)
    }
  }

  async createOperator(args, context){
    try{
      let operator = await DBGQLConnector.createDBObj(this.operatorModel, args, context)
      console.log(operator)
      if(operator == null){return {status: false}}
      return {
        status: true, 
        operator: operator
      }
    }catch(error){
      console.error(error)
    }
  }

  async getOperator(id, context){
    try{
    let operator = await  DBGQLConnector.dbFindWithTag(this.operatorModel,this.dbId, id, context)
    if(operator == null){return {status: false}}
    return {
      status: true, 
      operator: operator
    }
    }catch(error){
      console.error(error)
    }
  }

  async updateOperator(operatorId, operatorUpdate, context ){
    try{
      let update = await DBGQLConnector.dbUpdateOne(this.operatorModel, this.dbId, operatorId, operatorUpdate, context)
      return update
    }catch(error){
      console.error(error)
    }
  }

  async deleteOperator(operatorId, context){
    try{

      let deleted = await DBGQLConnector.deleteOneById(this.operatorModel, operatorId, context)
      return deleted
    }catch(error){
      console.error(error)
    }
  }

  async createCommuter(args, context){
    try{
      let commuter = await DBGQLConnector.createDBObj(this.commuterModel, args, context)
      if(commuter == null){return {status: false}}
      return {
        status: true, 
        commuter: commuter
      }
    }catch(error){
      console.error(error)
    }
  }

  async getCommuter(id, context){
    try{
    let commuter = await DBGQLConnector.dbFindWithTag(this.commuterModel,this.dbId, id, context)
    if(commuter == null){return {status: false}}
    return {
      status: true, 
      commuter: commuter
    }
    }catch(error){
      console.error(error)
    }
  }

  async updateCommuter(commuterId, commuterUpdate, context ){
    try{
      let update = await DBGQLConnector.dbUpdateOne(this.commuterModel, this.dbId, commuterId, commuterUpdate, context)
      return update
    }catch(error){
      console.error(error)
    }
  }

  async deleteCommuter(commuterId, context){
    try{

      let deleted = await DBGQLConnector.deleteOneById(this.commuterModel, commuterId, context)
      return deleted
    }catch(error){
      console.error(error)
    }
  }

  async createOperatorRoute(args, context){
    try{
      let operatorRoute= await DBGQLConnector.createDBObj(this.operatorRouteModel, args, context)
      if(operatorRoute == null){return {status: false}}
      return {
        status: true, 
        operatorRoute: operatorRoute
      }
    }catch(error){
      console.error(error)
    }
  }

  async getOperatorRoute(id, context){
    try{
    let operatorRoute = await DBGQLConnector.dbFindWithTag(this.operatorRouteModel,this.dbId, id, context)
    if(operatorRoute == null){return {status: false}}
    return {
      status: true, 
      operatorRoute: operatorRoute
    }
    }catch(error){
      console.error(error)
    }
  }

  async getOperatorRoutes(operatorId, context){
    try{
      let param = "operatorId"
      let operatorRoutes = await DBGQLConnector.dbFindAllWithTag(this.operatorRouteModel, param, operatorId, context)
      if(operatorRoutes == null){return {status: false}}
      return {
        status: true, 
        operatorRoutes: operatorRoutes
      }
    }catch(error){
      console.error(error)
    }
  }


  async getActiveOperatorRoutes(context){
    try{
      let param = "active"
      let operatorRoutes = await DBGQLConnector.dbFindAllWithTag(this.operatorRouteModel, param, true, context)
      if(operatorRoutes == null){return {status: false}}
      return {
        status: true, 
        operatorRoutes: operatorRoutes
      }
    }catch(error){
      console.error(error)
    }
  }

  async updateOperatorRoute(operatorRouteId, operatorRouteUpdate, context ){
    try{
      let update = await DBGQLConnector.dbUpdateOne(this.operatorRouteModel, this.dbId, operatorRouteId, operatorRouteUpdate, context)
      return update
    }catch(error){
      console.error(error)
    }
  }

  async deleteoperatorRoute(operatorRouteId, context){
    try{

      let deleted = await DBGQLConnector.deleteOneById(this.operatorRouteModel, operatorRouteId, context)
      return deleted
    }catch(error){
      console.error(error)
    }
  }

  async createPass(args, context){
    try{
      let pass = await DBGQLConnector.createDBObj(this.passModel, args, context)
      if(pass == null){return {status: false}}
      let scan = new ScannableCodeGenerator("png")
      let passMedia = await scan.generateCode(pass.id)
      let mediaPathUpdate = {
        mediaPath: passMedia
      }
      let mediaUpdate = await this.updatePass(pass.id, mediaPathUpdate, context)
      let payload = {
        docMatch: ObjectID(commuterId),
        updateContent: {
          passes: pass.id.toString()
        }
      }
      if(mediaUpdate.status){
      
      let commuterUpdate = await DBGQLConnector.dbUpdateOneArray(this.commuterModel, payload, context)
      let completePass = await this.getPass(pass.id, context)
        return {
          status: true,
          pass: completePass.pass
        }
      }

      return {
        status: true, 
        pass: pass
      }
    }catch(error){
      console.error(error)
    }
  }

  async scanPass(passId, scannedBy, context){
    try{
      let pass = await this.getPass(passId, context)
      if(pass.status === false){return {status: false, redeemed: null}}
      if(pass.pass.redeemed == true){ return {status: false, redeemed: true}}
      let redeemedUpdate = {
        redeemed: true,
        redeemDate: Date.now()
      }
      let scanUpdate = await this.updatePass(passId, redeemedUpdate, context )
      let payload = {
        docMatch: ObjectID(scannedBy),
        updateContent: {
          scannedPasses: passId
        }
      }
      let operatorPassUpdate = await DBGQLConnector.dbUpdateOneArray(this.operatorModel, payload, context)
      return {
        status: scanUpdate.status,
        redeemed: true
      }
    }catch(error){
      console.error(error)
    }

  }

  async getPass(id, context){
    try{
    let pass = await DBGQLConnector.dbFindWithTag(this.passModel,this.dbId, id, context)
    if(pass == null){return {status: false}}
    return {
      status: true, 
      pass: pass
    }
    }catch(error){
      console.error(error)
    }
  }

  async updatePass(passId, passUpdate, context ){
    try{
      let update = await DBGQLConnector.dbUpdateOne(this.passModel, this.dbId, passId, passUpdate, context)
      return update
    }catch(error){
      console.error(error)
    }
  }

  async deletePass(passId, context){
    try{

      let deleted = await DBGQLConnector.deleteOneById(this.passModel, passId, context)
      return deleted
    }catch(error){
      console.error(error)
    }
  }

}

module.exports = TransportManager

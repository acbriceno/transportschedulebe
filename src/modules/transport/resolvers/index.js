'use strict'
const createStop = require('./createStop')
const createOperator = require('./createOperator')
const createOperatorRoute = require('./createOperatorRoute')
const createCommuter = require('./createCommuter')
const createPass = require('./createPass')

const Stop = require('./stop')
let stop = Stop.stop
let stops = Stop.stops


const OperatorRoute = require('./operatorRoute')
let operatorRoute = OperatorRoute.operatorRoute
let operatorRoutes = OperatorRoute.operatorRoutes
let activeOperatorRoutes = OperatorRoute.activeOperatorRoutes

const Pass = require('./pass')
let scanPass = Pass.scanPass
let pass = Pass.pass

const Operator = require('./operator')
let operator = Operator.operator

const Commuter = require('./commuter')
let commuter = Commuter.commuter


const resolvers = {
  Query: {
    stop,
    stops,
    operatorRoute,
    operatorRoutes,
    activeOperatorRoutes,
    operator,
    commuter,
    pass
  },

  Mutation: {
    createStop,
    createOperatorRoute,
    createOperator,
    createCommuter, 
    createPass,
    scanPass
  },

  RouteResponse : {
    __isTypeOf:(obj, context, info) => {
      if(Object.prototype.hasOwnProperty.call(obj, 'route')){ return 'RouteResponse'}
    }
  },
  RoutesResponse : {
    __isTypeOf:(obj, context, info) => {
      if(Object.prototype.hasOwnProperty.call(obj, 'routes')){ return 'RoutesResponse'}
    }
  },
  StopResponse : {
    __isTypeOf:(obj, context, info) => {
      if(Object.prototype.hasOwnProperty.call(obj, 'stop')){ return 'StopResponse'}
    }
  },
  StopsResponse : {
    __isTypeOf:(obj, context, info) => {
      if(Object.prototype.hasOwnProperty.call(obj, 'stops')){ return 'StopsResponse'}
    }
  },
  OperatorRouteResponse : {
    __isTypeOf:(obj, context, info) => {
      if(Object.prototype.hasOwnProperty.call(obj, 'operatorRoute')){ return 'OperatorRouteResponse'}
    }
  },
  OperatorRoutesResponse : {
    __isTypeOf:(obj, context, info) => {
      if(Object.prototype.hasOwnProperty.call(obj, 'operatorRoutes')){ return 'OperatorRoutesResponse'}
    }
  },
  OperatorResponse : {
    __isTypeOf:(obj, context, info) => {
      if(Object.prototype.hasOwnProperty.call(obj, 'operator')){ return 'OperatorResponse'}
    }
  },
  PassResponse : {
    __isTypeOf:(obj, context, info) => {
      if(Object.prototype.hasOwnProperty.call(obj, 'pass')){ return 'PassResponse'}
    }
  },
  PassesResponse : {
    __isTypeOf:(obj, context, info) => {
      if(Object.prototype.hasOwnProperty.call(obj, 'passes')){ return 'PassesResponse'}
    }
  },


  CommuterResponse : {
    __isTypeOf:(obj, context, info) => {
      if(Object.prototype.hasOwnProperty.call(obj, 'commuter')){ return 'CommuterResponse'}
    }
  }









}

module.exports = resolvers

'use strict'
const createRoute = require('./createRoute')
const route = require('./route')
const resolvers = {
  Query: {
    route
  },

  Mutation: {
    createRoute
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

'use  strict'
const Users = require('./User')
const SecurityQAs = require('./SecurityQA')
const Pass = require('./Pass')
const OperatorRoute = require('./OperatorRoute')
const Commuter = require('./Commuter')
const Operator = require('./Operator')
const Stop = require('./Stop')
const  models = {
  users: Users,
  securityqas: SecurityQAs,
  stops: Stop,
  passes: Pass,
  operatorRoutes: OperatorRoute,
  commuters: Commuter,
  operators: Operator
}
module.exports = models

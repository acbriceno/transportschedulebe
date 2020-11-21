// const { UserInputError } = require('apollo-server-express')
// const bcrypt = require('bcryptjs')
// const Role = require('../../../models/Role')
const Secure = require('../../../utils/secure')
const DBGQLConnector = require('../../../utils/DBGQLConnector')
const signup = async (parent, args, context, info) => {
  try {
        console.log(args)
    
   
    //* **Better Implementation to be contd****
    // const objDBPayload = await context.datasource()[Role['properties'][role].collection].createObjDBPayload(args[Role['properties'][role].name.toLowerCase()])
    // const roleObj = await context.datasource()[Role['properties'][role].collection].create(objDBPayload)
    // roleId = roleObj.ops[0]._id
    // hasId = true
    //* ********************************

    // Todo: Hash and encrpyt password, store hashed pwd
    let securityAnswers = ''
    const securityqasObjDBPayload = await context.datasource().securityqas.createObjDBPayload(JSON.parse(JSON.stringify(args.securityqa)))
    const securityqas = await context.datasource().securityqas.create(securityqasObjDBPayload)
    // console.log(args.securityqa)
    for (var qa of securityqasObjDBPayload.sqa) {
      securityAnswers += qa.answer
    }
    const encryptedDataKeys = await Secure.generateEncryptedDataKeysWP(args.user.password, securityAnswers)

    const userArguments = args.user
    userArguments.securityqaId = securityqas.ops[0]._id
    userArguments.encryptedDataKeys = encryptedDataKeys
    userArguments.twoFactorAuth.code = null
    let createdUser = await DBGQLConnector.createDBObj("USER", userArguments, context)
    if(userArguments.role.role === "COMMUTER"){
      let commuter = await DBGQLConnector.createDBObj("COMMUTER", {}, context)
      const updatePayload = await context.datasource().users.getRoleUpdatePayload(createdUser.id, commuter.id)
      let update = await DBGQLConnector.dbUpdateOneArray('USER', updatePayload, context)
      if(update.status){
        let temp  = createdUser
        temp.role.id[0] = commuter.id
        createdUser = temp
      }
      
    }
 
   
    return createdUser
  } catch (error) {
    console.error(error)
  }
}

module.exports = signup

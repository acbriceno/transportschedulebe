// const { UserInputError } = require('apollo-server-express')
// const bcrypt = require('bcryptjs')
// const Role = require('../../../models/Role')
const Secure = require('../../../utils/secure')
const DBGQLConnector = require('../../../utils/DBGQLConnector')
const signup = async (parent, args, context, info) => {
  try {
    // Todo: Must add logic to signup for [Patient, doctor...,] then user account
    console.log(args)
    // const role = Role[String(args.user.role.role)]
    // let roleId
    // let hasId = false
    // switch (role) {
    //   case Role.PATIENT:
    //   {
    //     const patientObjDBPayload = await context.datasource().patients.createObjDBPayload(args.patient)
    //     const patient = await context.datasource().patients.create(patientObjDBPayload)
    //     roleId = patient.ops[0]._id
    //     hasId = true
    //     break
    //   }
    //   case Role.DOCTOR:
    //   {
    //     const doctorObjDBPayload = await context.datasource().doctors.createObjPayload(args.doctor)
    //     const doctor = await context.datasource().doctors.create(doctorObjDBPayload)
    //     roleId = doctor.ops[0]._id
    //     hasId = true
    //     break
    //   }
    //   case Role.NURSE:
    //   {
    //     const nurseObjDBPayload = await context.datasource().nurses.createObjDBPayload(args.nurse)
    //     const nurse = await context.datasource().nurses.create(nurseObjDBPayload)
    //     roleId = nurse.ops[0]._id
    //     hasId = true
    //     break
    //   }
    //   case Role.HCOADMIN:
    //   {
    //     const hcoObjDBPayload = await context.datasource().hcorganizations.createObjDBPayload(args.hcorganization)
    //     const hco = await context.datasource().hcorganizations.create(hcoObjDBPayload)
    //     console.log(hco)
    //     roleId = hco.ops[0]._id
    //     hasId = true
    //     break
    //   }
    //   case Role.TECHLAB:
    //   {
    //     const techlabObjDBPayload = await context.datasource().techlabs.createObjDBPayload(args.techlab)
    //     const techlab = await context.datasource().techlabs.create(techlabObjDBPayload)
    //     roleId = techlab.ops[0]._id
    //     hasId = true
    //     break
    //   }

    //   case Role.DISPENSARY:
    //   {
    //     const dispensaryObjDBPayload = await context.datasource().dispensaries.createObjDBPayload(args.dispensary)
    //     const dispensary = await context.datasource().dispensaries.create(dispensaryObjDBPayload)
    //     roleId = dispensary.ops[0]._id
    //     hasId = true
    //     break
    //   }

    //   case Role.COUNSELOR:
    //   {
    //     const counselorObjDBPayload = await context.datasource().counselors.createObjDBPayload(args.counselor)
    //     const counselor = await context.datasource().counselors.create(counselorObjDBPayload)
    //     roleId = counselor.ops[0]._id
    //     hasId = true
    //     break
    //   }

    //   case Role.NUTRITIONIST:
    //   {
    //     const nutritionistObjDBPayload = await context.datasource().nutritionist.createObjDBPayload(args.nutritionist)
    //     const nutritionist = await context.datasource().nutritionist.create(nutritionistObjDBPayload)
    //     roleId = nutritionist.ops[0]._id
    //     hasId = true
    //     break
    //   }

    //   default:
    //     hasId = false
    //     break
    // }

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
  i//  const userObjDBPayload = await context.datasource().users.createObjDBPayload(userArguments)// user object  for db storage
   // const user = await context.datasource().users.create(userObjDBPayload)
   // const userObjGQLPayload = await context.datasource().users.createObjGQLPayload(user.ops[0])
  //  console.log(userObjGQLPayload)
   // return userObjGQLPayload
 
    let createdUser = await DBGQLConnector.createDBObj("USER", userArguments, context)
    return createdUser
  } catch (error) {
    console.error(error)
  }
}

module.exports = signup

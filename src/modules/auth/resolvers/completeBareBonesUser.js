'use strict'

const Secure = require('../../../utils/secure')

const completeBareBonesUser = async (parent, args, context, info) => {
  try {
    const user = await context.user
    let securityAnswers = ''
    const securityqasObjDBPayload = await context.datasource().securityqas.createObjDBPayload(JSON.parse(JSON.stringify(args.securityqa)))
    const securityqas = await context.datasource().securityqas.create(securityqasObjDBPayload)
    // console.log(args.securityqa)
    for (var qa of securityqasObjDBPayload.sqa) {
      securityAnswers += qa.answer
    }
    const encryptedDataKeys = await Secure.generateEncryptedDataKeysWP(args.password, securityAnswers)

    const twoFactorAuth = args.twoFactorAuth
    twoFactorAuth.code = null

    const completeUserUpdate = {
      id: user.user._id,
      password: args.password,
      twoFactorAuth: twoFactorAuth,
      securityqaId: securityqas.ops[0]._id,
      encryptedDataKeys: encryptedDataKeys
    }
    const completeUserUpdatePayload = await context.datasource().users.completeBareBonesUserPayload(completeUserUpdate)
    const updateResponse = await context.datasource().users.updateOne(completeUserUpdatePayload.docMatch, completeUserUpdatePayload.updateContent)
    return await context.datasource().users.didUpdate(updateResponse)
  } catch (error) {
    console.error(error)
  }
}

module.exports = completeBareBonesUser

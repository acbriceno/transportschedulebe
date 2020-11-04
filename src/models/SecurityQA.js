'use strict'

const { MongoDataSource } = require('./../datasource')
const Secure = require('./../utils/secure')
class SecurityQAs extends MongoDataSource {
  initialize () {
    super.initialize()
  }

  async createObjDBPayload (args) {
    console.log('In SQA')
    console.log(args)
    const sqa = []
    for (var qa of args) {
      console.log(qa)
      const qaHolder = {
        question: qa.question,
        answer: await Secure.hashWP(qa.answer)
      }
      sqa.push(qaHolder)
    }
    const securityqa = {
      sqa: sqa
    }
    console.log(securityqa)
    return securityqa
  }

  createObjGQLPayload (args) {
    const securityqa = {
      id: args._id,
      sqa: args.sqa
    }
    return securityqa
  }
}

module.exports = SecurityQAs

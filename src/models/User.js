'use strict'
const ObjectID = require('mongodb').ObjectID
const { MongoDataSource } = require('./../datasource')
const Secure = require('./../utils/secure')
class Users extends MongoDataSource {
  initialize () {
    super.initialize()
  }

  async createObjDBPayload (args) {
    console.log(args)
    const user = {
      firstName: args.firstName,
      lastName: args.lastName,
      email: args.email,
      emailVerified: false,
      complete: true,
      password: await Secure.hashWP(args.password),
      role: {
        role: args.role.role,
        id: []
      },
      twoFactorAuth: args.twoFactorAuth,
      securityqaId: args.securityqaId,
      encryptedDataKeys: args.encryptedDataKeys
    }
    console.log(user)
    return user
  }

  createObjGQLPayload (args) {
    const user = {
      id: args._id,
      firstName: args.firstName,
      lastName: args.lastName,
      email: args.email,
      complete: args.complete,
      emailVerified: args.emailVerified,
      role: {
        role: args.role.role,
        id: args.role.id
      },
      twoFactorAuth: args.twoFactorAuth,
      securityqaId: args.securityqaId
    }
    return user
  }

  async createBareBonesObjDBPayload (args) {
    const user = {
      firstName: args.firstName,
      lastName: args.lastName,
      email: args.email,
      emailVerified: false,
      complete: false,
      password: await Secure.hashWP(args.password),
      role: {
        role: args.role.role,
        id: []
      },
      twoFactorAuth: null,
      securityqaId: null
    }
    return user
  }

  async createBareBonesObjGQLPayload (args) {
    const user = {
      id: args._id,
      firstName: args.firstName,
      lastName: args.lastName,
      email: args.email,
      complete: args.complete,
      emailVerified: args.emailVerified,
      role: {
        role: args.role.role,
        id: args.role.id
      }
    }
    return user
  }

  async completeBareBonesObjDBPayload (args) {
    const password = await Secure.hashWP(args.password)
    const userUpdate = await super.prototype.updateOne(
      {
        _id: ObjectID(args.id)
      },
      {
        password: password,
        complete: true,
        twoFactorAuth: args.twoFactorAuth,
        securityqaId: args.securityqaId,
        encryptedDataKeys: args.encryptedDataKeys
      }
    )

    if (userUpdate.modifiedCount > 0) {
      return true
    } else {
      return false
    }
  }

  async completeBareBonesUserPayload (args) {
    const password = await Secure.hashWP(args.password)
    return {
      docMatch: {
        _id: args.id
      },
      updateContent: {
        password: password,
        complete: true,
        twoFactorAuth: args.twoFactorAuth,
        securityqaId: args.securityqaId,
        encryptedDataKeys: args.encryptedDataKeys
      }
    }
  }

  async validateEmail (userID) {
    return super.prototype.updateOne(
      {
        _id: ObjectID(userID)
      },
      {
        emailVerified: true
      }
    )
  }

  async updateRoleIdArray (userID, roleID) {
    return super.prototype.updateOneArray(
      {
        _id: ObjectID(userID)
      },
      {
        'role.id': roleID
      }
    )
  }

  async getRoleUpdatePayload (userID, roleID) {
    const payload = {
      docMatch: userID,
      updateContent: {
        'role.id': roleID
      }
    }
    return payload
  }
}

module.exports = Users

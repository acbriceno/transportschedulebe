const ObjectID = require('mongodb').ObjectID
const validateEmail = async (parent, args, context, info) => {
  // find user in db
  // update user account with emailValidated = true
  // return true if action is done or false if not
  try {
    const user = {
      _id: ObjectID(args.userID)
    }
    const update = {
      emailVerified: true
    }
    const validatedEmail = await context.datasource().users.updateOne(user, update)
    if (validatedEmail.modifiedCount > 0) {
      return true
    } else {
      return false
    }
  } catch (error) {
    console.error(error)
  }
}

module.exports = validateEmail

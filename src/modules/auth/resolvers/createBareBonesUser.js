
const createBareBonesUser = async (parent, args, context, info) => {
  try {
    console.log(args)

    const userArguments = args.user

    const userObjDBPayload = await context.datasource().users.createBareBonesObjDBPayload(userArguments)// user object  for db storage
    const user = await context.datasource().users.create(userObjDBPayload)
    const userObjGQLPayload = await context.datasource().users.createBareBonesObjGQLPayload(user.ops[0])
    console.log(userObjGQLPayload)
    return userObjGQLPayload
  } catch (error) {
    console.error(error)
  }
}

module.exports = createBareBonesUser

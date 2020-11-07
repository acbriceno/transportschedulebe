const { gql } = require('apollo-server-express')

const typeDefs = gql`

extend type Mutation {
  login (
    email: String!,
    password: String!
  ): AuthData 

  baseLogin(email: String!, password: String!): AuthData

  signup(
    user: UserInput,
    securityqa: [SecurityQAInput!]!
  ): User

  createBareBonesUser(user: BareBonesUserInput!): BareBonesUser! 
  completeBareBonesUser(password: String!, twoFactorAuth: TwoFactorAuthInput!, securityqa: [SecurityQAInput!]!): Boolean! @isUserComplete @isAuthenticated
  validateEmail(userID: String!):Boolean

  twoFactorLogin(code: String! ): AuthData @firstAuth
}
`

module.exports = {
  typeDefs
}

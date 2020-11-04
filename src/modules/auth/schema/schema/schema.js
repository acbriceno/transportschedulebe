const { gql } = require('apollo-server-express')

const typeDefs = gql`

type User {
  id: ID!
  email: String!
  emailVerified: Boolean!
  firstName: String!
  lastName: String!
  complete: Boolean!
  role: Role!
  twoFactorAuth: TwoFactorAuth!
  securityqaId: ID!
}

input UserInput {
  email: String!
  password: String!
  firstName: String!
  lastName: String!
  role: RoleInput!
  twoFactorAuth: TwoFactorAuthInput!
}

type BareBonesUser{
  id: ID!
  email: String!
  password: String!
  firstName: String! 
  lastName: String!
  complete: Boolean!
  role: Role!
  emailVerified: Boolean!
}

input BareBonesUserInput {
  email: String!
  password: String!
  firstName: String! 
  lastName: String!
  role: RoleInput!
}

enum AccessRole {
  ADMIN
  OPERATOR
  COMMUTER
}

type Role{
  id: [ID!]!
  role: AccessRole
}

type AuthData {
  user: User
  token: String!
  tokenExpiration: String!
}

input RoleInput {
  role: AccessRole
}

input TwoFactorAuthInput {
  email: String!
  telephone: String
  active: TwoFactorAuthType! 
}

type TwoFactorAuth {
  expiration: DateTime
  code: String
  email: String!
  telephone: String
  active: TwoFactorAuthType!
}

enum TwoFactorAuthType {
  EMAIL
  TELEPHONE
}

type SecurityQA {
  question: String!
  answer: String!
}


input SecurityQAInput {
  question: String!
  answer: String!
}


interface Response {
  status: Boolean!
  code: String!
}

`
// console.log(typeDefs)
module.exports = typeDefs

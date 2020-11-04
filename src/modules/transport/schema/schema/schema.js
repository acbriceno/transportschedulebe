const { gql } = require('apollo-server-express')

const typeDefs = gql`

  type Stop {
    lat: Float!
    lon: Float!
    name: String!
    id: ID!
    type: StopType!
  }

  enum StopType {
    TERMINAL
  }


  type Operator {
    id: ID!
    name: String!
    licenseNo: String!
  }

  type OperatorRoute {
    id: ID!
    route: Route!
    departureTime: DateTime!
    arrivalTime: DateTime!
    type: RouteType!
    intermediaries: [Intermediary!]

  }
  
  input OperatorRouteInput{
    route: String!
    departureTime: DateTime!
    arrivalTime: DateTime!
    type: RouteType!
    intermediaries: [IntermediaryInput!]
    
  }

  type Route {
    id: ID!
    startPos: Stop!
    endPos: Stop!
    distance: Float!
  }

  type Intermediary{
    pos: Stop!
    time: DateTime!
  }

  input IntermediaryInput{
    pos: String!
    time: DateTime!
  }

  enum RouteType {
  REGULAR
  EXPRESS
  NONSTOP
  }

  type Pass {
    id: ID!
    code: String!
    value: Int!
    purchaseDate: DateTime!
    route: ID!
    type: RouteType!
    used: Boolean!
  }

  input PassInput {
    value: Int!
    purchaseDate: DateTime!
    route: ID!
    type: RouteType!
  }

  type Commuter {
    id: ID!
    passes:[Pass!]
  }


  input RouteInput {
   startPos: StopInput!
   endPos: StopInput!
   departureTime: DateTime!
   arrivalTime: DateTime!
   type: RouteType!
  }

  input StopInput {
    lat: Float!
    lon: Float!
    name: String!
  }

  input OperatorInput{
    name: String!
    licenseNo: String!
  }


  type RouteResponse {
    status: Boolean!
    code: String!
  }

  type RoutesResponse {
    status: Boolean!
    code: String!
    routes: [Route!]
  }

  type StopResponse{
    status: Boolean!
    code: String!
    stop: Stop
  }

  type StopsResponse{
    status: Boolean!
    code: String!
    stops: [Stop!]
  }

  type OperatorRouteResponse{
    status: Boolean!
    code: String!
    operatorRoute: OperatorRoute
  }

  type OperatorRoutesResponse{
    status: Boolean!
    code: String!
    operatorRoutes: [OperatorRoute!]
  }

  type OperatorResponse {
    status: Boolean!
    code: String!
    operator: Operator
  }

  type PassResponse {
    status: Boolean!
    code: String!
    pass: Pass
  }

  type PassesResponse {
    status: Boolean!
    code: String!
    passes: [Pass!]
  }

  type CommuterResponse {
    status: Boolean!
    code: String!
    commuter: Commuter
  }

  


`
// console.log(typeDefs)
module.exports = typeDefs

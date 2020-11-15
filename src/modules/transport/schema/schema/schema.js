const { gql } = require('apollo-server-express')

const typeDefs = gql`

  type Stop {
    lat: Float!
    lon: Float!
    name: String!
    id: ID!
    type: StopType!
    location: String!
    active: Boolean!
  }

  enum StopType {
    TERMINAL
  }


  type Operator {
    id: ID!
    name: String!
    licenseNo: String!
    scannedPasses: [String!]
  }

  type OperatorRoute {
    id: ID!
    route: Route!
    schedule: [Schedule!]
    routeType: RouteType!
    intermediaries: [Intermediary!]
    operatorId: String!
    active: Boolean!

  }
  
  input OperatorRouteInput{
    route: RouteInput!
    schedule: [ScheduleInput!]
    routeType: RouteType!
    intermediaries: [IntermediaryInput!]
    
  }
  enum Day{
    MONDAY
    TUESDAY
    WEDNESDAY
    THURSDAY
    FRIDAY
    SATURDAY
    SUNDAY
  }

  type Schedule{
    day: Day!
    departureTime: String!
    arrivalTime: String!
  }

  input ScheduleInput{
    day: Day!
    departureTime: String!
    arrivalTime: String!
  }

  type Route {
    startStopId: String!
    endStopId: String!
    distance: Float!
  }

  type Intermediary{
    stopId: String!
    time: DateTime!
  }

  input IntermediaryInput{
    stopId: String!
    time: DateTime!
  }

  enum RouteType {
  REGULAR
  EXPRESS
  NONSTOP
  }

  type Pass {
    id: ID!
    mediaPath: String!
    value: Int!
    purchaseDate: DateTime!
    redeemDate: DateTime!
    route: Route!
    routeType: RouteType!
    used: Boolean!
  }

  input PassInput {
    value: Int!
    route: RouteInput!
    routeType: RouteType!
  }

  type Commuter {
    id: ID!
    passes:[String!]
  }

  input CommuterInput{
    passes: [String!]
  }
  input RouteInput {
   startStopId: String!
   endStopId: String!
  }

  input StopInput {
    lat: Float!
    lon: Float!
    name: String!
    location: String!
    type: StopType!
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

  type StopResponse implements Response{
    status: Boolean!
    code: String!
    stop: Stop
  }

  type StopsResponse implements Response{
    status: Boolean!
    code: String!
    stops: [Stop!]
  }

  type OperatorRouteResponse implements Response {
    status: Boolean!
    code: String!
    operatorRoute: OperatorRoute
  }

  type OperatorRoutesResponse implements Response {
    status: Boolean!
    code: String!
    operatorRoutes: [OperatorRoute!]
  }

  type OperatorResponse implements Response  {
    status: Boolean!
    code: String!
    operator: Operator
  }

  type PassResponse  implements Response {
    status: Boolean!
    code: String!
    pass: Pass
  }

  type PassesResponse {
    status: Boolean!
    code: String!
    passes: [Pass!]
  }

  type CommuterResponse implements Response {
    status: Boolean!
    code: String!
    commuter: Commuter
  }

  type BareOperatorResponse implements Response {
  status: Boolean!
  code: String!
  operatorRole: String
  }

  


`
// console.log(typeDefs)
module.exports = typeDefs

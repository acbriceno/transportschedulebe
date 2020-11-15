'use strict'
const ModelConnection = require('./ModelCollection')
const Role = require('../models/Role')
const ObjectID = require('mongodb').ObjectID
const util = require('util')
const dbToGqlFind = async function (model, payloadList, context) {
  try {
    const modelIds = payloadList.map(function (id) { return ObjectID(id) })
    const payload = {
      _id: { $in: modelIds }
    }
    const modelCollectionID = ModelConnection[model]
    const modelDB = await context.datasource()[ModelConnection.properties[modelCollectionID].collection].find(payload)
    // console.log(modelDB)
    const modelGQLPayload = await modelDB.map(function (modelType) { return context.datasource()[ModelConnection.properties[modelCollectionID].collection].createObjGQLPayload(modelType) })
    return modelGQLPayload
  } catch (error) {
    console.error(error)
  }
}

const dbUpdateOneArray = async function (model, payload, context) {
  const docMatch = {
    _id: ObjectID(payload.docMatch)
  }
  const modelCollectionID = ModelConnection[model]
  const modelDB = await context.datasource()[ModelConnection.properties[modelCollectionID].collection].updateOneArray(docMatch, payload.updateContent)
  return modelDB
}

const dbUpdateOne = async function(model, docMatchProperty, docMatchData, updateContent, context){
  let docMatch = {}
  docMatch[docMatchProperty] = docMatchData
  const modelCollectionID = ModelConnection[model] 
  const dbResponse = await context.datasource()[ModelConnection.properties[modelCollectionID].collection].updateOne(docMatch, updateContent)
  let response = {}
  if(context.datasource()[ModelConnection.properties[modelCollectionID].collection].didUpdate(dbResponse)){
    response['status'] = true
    return response
  }
  response['status'] = false
  return response
}

const dbFindWithTag = async function (model, param, content, context) {
  try {
    const payload = {}
    payload[param] = content
    console.log(payload)
    const modelCollectionID = ModelConnection[model]
    const modelDB = await context.datasource()[ModelConnection.properties[modelCollectionID].collection].find(payload)
    // const modelDB = await context.datasource().hcorganizations.find(payload)
    console.log(modelDB)
    if (modelDB.length > 0) {
      const modelGQLPayload = await context.datasource()[ModelConnection.properties[modelCollectionID].collection].createObjGQLPayload(modelDB[0])
      console.log(modelGQLPayload)
      return modelGQLPayload
    }
    return null
  } catch (error) {
    console.error(error)
  }
}


const dbFindAllWithTag = async function (model, param, content, context) {
  try {
    const payload = {}
    payload[param] = content
    const modelCollectionID = ModelConnection[model]
    const modelDB = await context.datasource()[ModelConnection.properties[modelCollectionID].collection].find(payload)
    // const modelDB = await context.datasource().hcorganizations.find(payload)
    if (modelDB.length > 0) {

    const modelGQLPayload = await modelDB.map(function (modelType) { return context.datasource()[ModelConnection.properties[modelCollectionID].collection].createObjGQLPayload(modelType) })

      return modelGQLPayload
    }
    return null
  } catch (error) {
    console.error(error)
  }
}



const createDBObj = async function (model, payload, context) {
  const modelCollectionID = ModelConnection[model]
  const modelPayload = await context.datasource()[ModelConnection.properties[modelCollectionID].collection].createObjDBPayload(payload)
  const modelDB = await context.datasource()[ModelConnection.properties[modelCollectionID].collection].create(modelPayload)
  console.log(modelDB)
  if (modelDB.insertedCount > 0) {
    const modelGQLPayload = await context.datasource()[ModelConnection.properties[modelCollectionID].collection].createObjGQLPayload(modelDB.ops[0])
    console.log(modelGQLPayload)
    return modelGQLPayload
  }
  return null
}

const dbToGQLRoleObjectFind = async function (userObjects, context) {
  let roleObjects = []
  const roleIds = []
  let empty = true

  for (var roleProperty in Role.properties) {
    const roleObjectIds = []
    for (var user of userObjects) {
      if (user.role.role === Role.properties[roleProperty].code) {
        empty = false
        roleObjectIds.push(user.role.id[0].toString())
      }
    }
    if (!empty) {
      roleIds.push(roleObjectIds)
      var modelGQL = await dbToGqlFind(Role.properties[roleProperty].code, roleObjectIds, context)
      roleObjects = roleObjects.concat(modelGQL)
      empty = true
    }
  }
  return roleObjects
}


  const deleteOneById = async function(model, id, context){
    const payload = {
      _id: id
    }
    const modelCollectionID = ModelConnection[model]
    let dbResponse = await context.datasource()[ModelConnection.properties[modelCollectionID].collection].deleteOne(payload)
    let response = {}
     if(context.datasource()[ModelConnection.properties[modelCollectionID].collection].didDeleteOne(dbResponse)){
    response['status'] = true
    return response
  }
  response['status'] = false
  return response 
  }


  const findUsingAggregateWithMatch = async function(context){
    const searchResults = await context.datasource().search.aggregateWithMatch()
    console.log(util.inspect(searchResults, { showHidden: true, depth: null }))

    console.log("----------------")
      }

module.exports = {
  dbToGqlFind: dbToGqlFind,
  createDBObj: createDBObj,
  dbUpdateOneArray: dbUpdateOneArray,
  dbToGQLRoleObjectFind: dbToGQLRoleObjectFind,
  dbFindWithTag: dbFindWithTag,
  dbFindAllWithTag: dbFindAllWithTag,
  deleteOneById: deleteOneById,
  dbUpdateOne: dbUpdateOne,
  findUsingAggregateWithMatch: findUsingAggregateWithMatch
}

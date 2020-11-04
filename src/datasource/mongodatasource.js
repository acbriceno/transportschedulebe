'use strict'

const { DataSource } = require('apollo-datasource')
const { ApolloError } = require('apollo-server-errors')
const { InMemoryLRUCache } = require('apollo-server-caching')
// const assert = require('assert')
const createCachingMethods = require('./mongocache')
// const TYPEOF_COLLECTION = 'object'

class MongoDataSource extends DataSource {
  constructor (collection) {
    super()
    console.log('MongoDataSource: Collection Added')
    //    console.log(collection)
    if (!((collection && (typeof collection === 'object')))) {
      throw new ApolloError('MongoDataSource requires a collection')
    }

    this.collection = collection
  }

  initialize ({ context, cache } = {}) {
    this.context = context

    const methods = createCachingMethods({
      collection: this.collection,
      cache: cache || new InMemoryLRUCache()
    })

    Object.assign(this, methods)
  }




  aggregateWithMatch(){

    return new Promise((resolve, reject) => {
      try{
        resolve(this.collection.aggregate([
          {"$facet":{
            "c1":[
              {
                "$lookup": {
                  "from": "nutritionists",
                  "pipeline": [
                    {"$match": {"services": "DRESSINGS"}}
                  ],
                  "as": "doctors"
                }
              }
            ],
             "c2":[
              {
                "$lookup": {
                  "from": "techlabs",
                  "pipeline": [
                    {"$match": {"services": "DRESSINGS"}}
                  ],
                  "as": "techLabs"
                }
              }
            ]
            }
          },

          { "$project": {
            "data": {
              "$concatArrays": ["$c1", "$c2"],
            }
          }},
          {"$unwind": "$data"},
          {"$replaceRoot": {"newRoot": "$data" } }

        ]).toArray()
        )
      }catch(error){
        reject(error)
      }
    })

  }

  get (id) {
    this.collection.findOne({ _id: id }, function (err, result) {
      if (err) throw err
      console.log(err)
      console.log(result)
      return result
    })
  }

  getOne (data) {
    return new Promise((resolve, reject) => {
      try {
        resolve(this.collection.findOne(data))
      } catch (error) {
        reject(error)
      }
    })
  }

  find (payload) {
    return new Promise((resolve, reject) => {
      try {
        if (!payload) {
          resolve(this.collection.find())
        } else {
          resolve(this.collection.find(payload).toArray())
        }
      } catch (error) {
        reject(error)
      }
    })
  }

  findWithCursor (payload) {
    return new Promise((resolve, reject) => {
      try {
        if (!payload) {
          resolve(this.collection.find())
        } else {
          resolve(this.collection.find(payload))
        }
      } catch (error) {
        reject(error)
      }
    })
  }

  findWithProjection (payload, projection) {
    return new Promise((resolve, reject) => {
      try {
        if (!payload) {
          resolve(this.collection.find())
        } else {
          resolve(this.collection.find({ _id: payload }).toArray())
        }
      } catch (error) {
        reject(error)
      }
    })
  }

  create (doc) {
    return this.collection.insertOne(doc)
    // this.collection.insertOne(doc, function (err, result) {
    //  assert.equal(null, err)
    //  assert.equal(1, result.insertedCount)
    // console.log(result.ops[0])
    //   return callback(result.ops[0])
    //  })
  }

  updateOne (docMatch, updateContent) {
    return new Promise((resolve, reject) => {
      try {
        resolve(this.collection.updateOne(docMatch, { $set: updateContent }))
      } catch (error) {
        reject(error)
      }
    }
    )
  }

  updateOneArray (docMatch, updateContent) {
    return new Promise((resolve, reject) => {
      try {
        resolve(this.collection.updateOne(docMatch, { $addToSet: updateContent }))
      } catch (error) {
        reject(error)
      }
    }
    )
  }

  didUpdate (response) {
    if (response.modifiedCount > 0) {
      return true
    }
    return false
  }

  didDeleteOne(response){
    if(response.deletedCount > 0){
      return true
    }
    return false
  }

  stats () {
    return new Promise((resolve, reject) => {
      try {
        resolve(this.collection.stats())
      } catch (error) {
        reject(error)
      }
    }
    )
  }

  deleteOne(payload){
    return new Promise((resolve, reject) => {
      try{
        resolve(this.collection.deleteOne(payload))
      }catch(error){
        reject(error)
      }
    })
  }


}

module.exports = { MongoDataSource }

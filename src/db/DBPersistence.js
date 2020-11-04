'use strict'

const MongoDao = require('./MongoDao')
const config = require('./../config')

const dbConfig = {
  uri: config.uri,
  dbName: config.DBNAME
}

// var DBPersistence = function () {

// }

// DBPersistence.prototype.connect = function (config) {
//  var _this = this

//  return new Promise(function (resolve, reject) {
//    _this.mongoDao = new MongoDao(config.uri, config.dbName)
//    if (_this.mongoDao != null) {
//      resolve(this)
//    } else {
//      reject(Error('Could Not Connect DBPersistence and DB Successfully'))
//    }
//  })
// }

// DBPersistence.prototype.getDb = function () {
//  return this.mongoDao.get()
// }

// DBPersistence.prototype.save = function (transaction) {
//  console.log(transaction)
// const payload = {
//   doc: {
//     collection: transaction.collection,
//      obj: transaction.obj
//    }
//  }
//  console.log(payload)
//  console.log(payload.doc.obj.firstName)
//  return payload
//  return new Promise (function (resolve, reject) {
//    this.mongoDao.insertDocument(payload, function(data){
//      if(data != null){
//        resolve(data)
//      }else{
//        reject(Error('Could not save data and or get the requested data to be saved'))
//      }
//
//    })
//  })
// }

const DBPersistence = {

  mongo: '+',
  connect: () => {
    var _this = this
    return new Promise(function (resolve, reject) {
      _this.mongoDao = new MongoDao(dbConfig.uri, dbConfig.dbName)
      _this.mongoDao.then(function (result) {
      //  console.log(result)
        DBPersistence.mongo = result
        resolve(result)
      }, function (err) {
        console.log(err)
        reject(Error('Could not Connecct DB Persistence to DB Succesfully'))
      })
    })
  },
  getDb: async () => {
  }

}

module.exports = DBPersistence

'use strict'
const MongoClient = require('mongodb').MongoClient
// const Promise = require('Promise')
const assert = require('assert')
let _db
var MongoDao = module.exports = function (mongoUri, dbName) {
  var _this = this
  var options = {
    useNewUrlParser: true,
    retryWrites: true,
    w: 'majority',
    useUnifiedTopology: true
  }
  _this.mongoClient = new MongoClient(mongoUri, options)
  return new Promise(function (resolve, reject) {
    _this.mongoClient.connect(function (err, client) {
      assert.equal(err, null)
      console.log('Mongo Client successfully connected \n')
      _this.dbConnection = _this.mongoClient.db(dbName)
      console.log(_this.dbConnection.databaseName)
      _db = _this.dbConnection
      resolve(_this.dbConnection)
    })
  })
}

MongoDao.prototype.get = function () {
  return _db
}

MongoDao.prototype.close = function () {
  this.dbConnection.close()
}

MongoDao.prototype.insertDocument = function (payload, callback) {
  this.dbConnection.collection(payload.doc.name).insertOne(JSON.stringify(payload.doc.obj), function (err, result) {
    assert.equal(null, err)
    assert.equal(1, result.insertedCount)
    return callback(result)
  })
}

MongoDao.prototype.findDocument = function (payload, callback) {
  this.dbConnection.collection(payload.doc.name).findOne(payload.query, function (err, result) {
    if (err) throw err
    return callback(result)
  })
}

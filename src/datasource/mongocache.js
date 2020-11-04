'use strict'

const DataLoader = require('dataloader')

const orderDocs = ids => docs => {
  const idMap = {}
  docs.forEach(doc => {
    idMap[doc._id] = doc
  })
  return ids.map(id => idMap[id])
}

const createCachingMethods = ({ collection, cache }) => {
  const loader = new DataLoader(ids =>
    collection
      .find({ _id: { $in: ids } })
      .toArray()
      .then(orderDocs(ids))
  )

  console.log()

  // const cachePrefix = `mongo-${getCollection(collection).collectionName}-`
  const cachePrefix = `mongo-${collection.collectionName}-`
  console.log(cachePrefix)
  const methods = {
    findOneById: async (id, { ttl } = {}) => {
      const key = cachePrefix + id

      const cacheDoc = await cache.get(key)
      if (cacheDoc) {
        return JSON.parse(cacheDoc)
      }

      const doc = await loader.load(id)
      if (Number.isInteger(ttl)) {
        cache.set(key, JSON.stringify(doc), { ttl })
      }

      return doc
    },
    findManyByIds: (ids, { ttl } = {}) => {
      return Promise.all(ids.map(id => methods.findOneById(id, { ttl })))
    },
    deleteFromCacheById: async id => {
      loader.clear(id)
      await cache.delete(cachePrefix + id)
    }
  }

  return methods
}

module.exports = createCachingMethods

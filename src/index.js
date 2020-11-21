const throng = require('throng')
// const app = require('./app')
// const config = require('./config')
// const MongoDao = require('./db/MongoDao')
// const DBPersistence = require('./db/DBPersistence')
// const uri = 'mongodb+srv://' + config.DBSERVERAPPUSER + ':' + config.DBSERVERAPPUSERPWD + '@' + config.MONGODB_URI

// const persistence = new DBPersistence()

const express = require('express')

// will be used for testing to use supertest which needs app object
const { ApolloServer } = require('apollo-server-express')
const cors = require('cors')
const context = require('./utils/context')
const schema = require('./modules')
const models = require('./models')
const config = require('./config')
const MongoDao = require('./db/MongoDao')

const dsHolder = {}
let model
const dbConfig = {
  uri: config.uri,
  dbName: config.DBNAME
}

const startServer = async function () {
  try {
    const mongoDao = await new MongoDao(dbConfig.uri, dbConfig.dbName)

    for (model in models) {
      // console.log(model)
      dsHolder[model] = await new models[model](mongoDao.collection(model))
      dsHolder[model].initialize()
    }

    const server = await new ApolloServer({
      schema,
      context: async ({ req }) => ({

        user: await context.getUser(req, dsHolder.users),
        datasource: () => (dsHolder)
      }),
      introspection: true,
      cacheControl: { calculateHttpHeaders: false }
    })

    const app = express()

   
const whitelist = [
    // Allow domains here
    'http://localhost:3000',
    'http://192.168.2.212:3000'
];
const corsOptions = {
    origin(origin, callback){
        const originIsWhitelisted = whitelist.indexOf(origin) !== -1;
        callback(null, originIsWhitelisted);
    },
    credentials: true
};
    app.use(cors(corsOptions))
    app.use('/static', express.static('src/utils/scannableMedia'))
    //app.use('/static', express.static(path.join(__dirname, 'src/utils/scannableMedia')))
    server.applyMiddleware({
      path: '/',
      app,
      cors: false
    })

    await Promise.all([
      app.listen(config.PORT)
    ])

    console.log('Server has started on port' + config.PORT)
  } catch (error) {
    console.error('Could not start the app: ', error)
  }
}

throng({
  workers: config.WORKERS,
  lifetime: Infinity
}, startServer)

// startServer()//

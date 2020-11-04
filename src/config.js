const PORT = process.env.PORT
const MONGODB_URI = process.env.MONGODB_URI
const DBSERVERAPPUSER = process.env.DBSERVERAPPUSER
const DBSERVERAPPUSERPWD = process.env.DBSERVERAPPUSERPWD
const DBNAME = process.env.DBNAME
const WORKERS = process.env.WORKERS
const JWT_LIFE_TIME = process.env.JWT_LIFE_TIME
const JWT_LIFE_TIME_TWO = process.env.JWT_LIFE_TIME_TWO
const JWT_SECRET = process.env.JWT_SECRET
const uri = 'mongodb+srv://' + DBSERVERAPPUSER + ':' + DBSERVERAPPUSERPWD + '@' + MONGODB_URI

module.exports = {
  PORT,
  MONGODB_URI,
  DBSERVERAPPUSER,
  DBSERVERAPPUSERPWD,
  DBNAME,
  WORKERS,
  JWT_LIFE_TIME,
  JWT_LIFE_TIME_TWO,
  JWT_SECRET,
  uri
}

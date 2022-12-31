const Router = require('express').Router()
const ModemRouter = require('../routes/modemRoutes')

Router.use('/',ModemRouter)

module.exports = Router
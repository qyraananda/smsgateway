const express = require('express');
const ModemRouter = express.Router();
const checksession = require('../models/CheckSession')
const modem = require('../controllers/modemControllers')

ModemRouter.get('/modemindex', modem.modemPages)
ModemRouter.post('/detectport',modem.detectport)
ModemRouter.get('/inboxIndex', modem.inboxPages)
ModemRouter.get('/inboxIndex/read/(:read)',modem.inboxread)
ModemRouter.get('/outboxIndex',modem.outboxPages)
ModemRouter.get('/sentboxIndex',modem.sentboxPages)
ModemRouter.post('/sentitems',modem.sentitems)

module.exports=ModemRouter
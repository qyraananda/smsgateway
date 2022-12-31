const express = require('express');
const moment = require('moment');
const modemModel = require('../models/modemModel')

module.exports = {
    modemPages:async (req, res, next) => {
        let sql = "select ID,UpdatedInDB,TimeOut, IMEI, IMSI,NetName from phones order by netname";
        let data = await modemModel.sqlQuery(sql,"")
        res.render('./modemIndex', {
            title: 'Modem - Master',
            myName: "User",
            datamodem:data,
            moment:moment
        })
    },
    inboxPages:async(req,res,next) => {
        let sql = "select ID,UpdatedInDB,ReceivingDateTime, SenderNumber, SMSCNumber ,TextDecoded,status from inbox order by ID desc, status asc";
        let data = await modemModel.sqlQuery(sql,"")
        res.render('./inboxIndex', {
            title: 'Inbox - List',
            myName: "User",
            datainbox:data,
            moment:moment
        })
    },
    outboxPages:async(req,res,next) => {
        let sql = "select ID,UpdatedInDB,SendingDateTime, DestinationNumber, TextDecoded from outbox order by ID desc";
        let data = await modemModel.sqlQuery(sql,"")
        res.render('./outboxIndex', {
            title: 'Outbox - List',
            myName: "User",
            dataoutbox:data,
            menu:"Outbox",
            moment:moment
        })
    },
    sentboxPages:async(req,res,next) => {
        let sql = "select ID,UpdatedInDB,SendingDateTime, DestinationNumber, TextDecoded from sentitems order by ID desc";
        let data = await modemModel.sqlQuery(sql,"")
        res.render('./outboxIndex', {
            title: 'Sentbox - List',
            myName: "User",
            dataoutbox:data,
            menu:"SentBox",
            moment:moment
        })
    },
    sentitems: async(req, res, next) => {
        console.log('sent message')
            // console.log(req.body)
        await modemModel.send(req.body,"sent")
        let sql = "select ID,UpdatedInDB,SendingDateTime, DestinationNumber, TextDecoded from sentitems order by ID desc";
        let data = await modemModel.sqlQuery(sql,"")
        res.render('./outboxIndex', {
            title: 'Sentbox - List',
            myName: "User",
            dataoutbox:data,
            menu:"SentBox",
            moment:moment
        })
    },
    detectport: async (req, res, next) => {
        console.log('gammu-detect')
        // console.log(req.body)
        console.log(await modemModel.identify(req.body.text))
        let sql = "select ID,UpdatedInDB,TimeOut, IMEI, IMSI,NetName from phones order by netname";
        let data = await modemModel.sqlQuery(sql, "")
        res.render('./modemIndex', {
            title: 'Modem - Master',
            myName: "User",
            datamodem: data,
            moment: moment
        })
    },
    inboxread: async (req, res, next) => {
        console.log('gammu-detect')
        // console.log(req.body)
        let upd = "update inbox set status=1 where id=" + req.params.read
        let data1 = await modemModel.sqlQuery(upd, "")
        let sql = "select ID,UpdatedInDB,ReceivingDateTime, SenderNumber, SMSCNumber ,TextDecoded,status from inbox order by ID desc, status asc";
        let data = await modemModel.sqlQuery(sql, "")
        res.render('./inboxIndex', {
            title: 'Inbox - List',
            myName: "User",
            datainbox: data,
            moment: moment
        })
    },
}
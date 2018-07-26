var express = require('express');
var router = express.Router();
var service = require('../service');



router.get('/getLatestBlock', (req, res) => {
    service.getLatestBlock().then(result => {
        return res.json(result);
    })
})

router.get('/getBlocks/:p/:count', (req, res) => {
    service.getBlocksByPage(req.params.p, req.params.count).then(result => {
        return res.json(result.reverse());
    })
})

router.get('/getBlock/:hash', (req, res) => {
    service.getBlock(req.params.hash).then(result => {
        return res.json(result);
    })
})

router.get('/getBlockCount', (req, res) => {
    service.getBlockCount().then(result => {
        return res.json(result);
    })
})

router.get('/getTxInfo/:txid', (req, res) => {
    service.getRawTransaction(req.params.txid)
        .then(result => service.decodeRawTransaction(result))
        .then(result => {
            return res.json(result);
        })
})

router.post('/createAccount', (req, res) => {
    let account =  '';

    if(req.body.account){
        account = req.body.account;;
    }

    service.createAccount(account)
        .then(result => {
            return res.json(result);
        }).catch(err => {
            return 'error';
    })
})


module.exports = router;

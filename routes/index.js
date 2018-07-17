var express = require('express');
var router = express.Router();
var service = require('../service');



router.get('/getLatestBlock', (req, res) => {
    service.getLatestBlock().then(result => {
        res.send(result);
    })
})

router.get('/getBlocks/:p/:count', (req, res) => {
    service.getBlocksByPage(req.params.p, req.params.count).then(result => {
        res.send(result.reverse());
    })
})

router.get('/getBlock/:hash', (req, res) => {
    service.getBlock(req.params.hash).then(result => {
        res.send(result);
    })
})


module.exports = router;

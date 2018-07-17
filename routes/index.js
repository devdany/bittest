var express = require('express');
var router = express.Router();
var service = require('../service');



router.get('/getLatestBlock', (req, res) => {
    service.getLatestBlock().then(result => {
        res.send(result);
    })
})

router.get('/getBlock/:p', (req, res) => {
    service.getBlock(req.params.p).then(result => {
        res.send(result.reverse());
    })
})


module.exports = router;

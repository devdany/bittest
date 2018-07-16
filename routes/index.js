var express = require('express');
var router = express.Router();
var service = require('../service');

router.get('/getLatestBlock', (req, res) => {
    service.getLatestBlock().then(result => {
        res.send(result);
    })
})


module.exports = router;

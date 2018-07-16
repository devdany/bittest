var express = require('express');
var router = express.Router();
var service = require('../service');

router.get('/getLatestBlock', (req, res) => {
    res.send(service.getLatestBlock());
})


module.exports = router;

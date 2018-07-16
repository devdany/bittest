var express = require('express');
var router = express.Router();
var call = require('../call');

router.get('/:method', (req, res) => {
    const method = req.params.method;
    call(method).then(result => {
        res.send(result);
    })
})


router.get('/:method/:params', (req, res) => {
    const method = req.params.method;
    let params = req.params.params;

    if(isNaN(params)){
        params = '"'+params+'"'
    }

    call(method, params).then(result => {
        res.send(result);
    })
})


module.exports = router;

const request = require('request');

var call = (method, param) => {

    return new Promise((resolve, reject) => {


        var headers = {
            'content-type': 'text/plain;'
        };

        var dataString = '';

        if(param){
            dataString = '{"jsonrpc": "1.0", "id":"curltest", "method": "'+method+'", "params": ['+param+'] }';
        }else{
            dataString = '{"jsonrpc": "1.0", "id":"curltest", "method": "'+method+'", "params": [] }';
        }

        var options = {
            url: 'http://127.0.0.1:51473/',
            method: 'POST',
            headers: headers,
            body: dataString,
            auth: {
                'user': 'dany',
                'pass': 'ideacomes!234'
            }
        };

        request(options, (err, res, body) => {
            if(err || res.statusCode !== 200){
                return reject(err);
            }

            return resolve(body);
        })
    })


}

module.exports = call;
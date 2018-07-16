var call = require('./call');

var service = {
    getLatestBlock: () => {

        return new Promise((resolve, reject) => {
            call('getblockcount').then(result => {
                console.log('-----1-----')
                console.log(JSON.parse(result).result);
                return JSON.parse(result).result;
            }).then(count => {
                console.log(count);
                const offset = count -9;
                const blockInfos = []
                for(let i = offset; i<=count; i++){
                    call('getblockhash',i).then(result => {
                        const hash = JSON.parse(result).result;
                        call('getblock', hash).then(result => {
                            const blockInfo = JSON.parse(result).result;
                            blockInfos.push(blockInfo)
                        })
                    })
                }

                return resolve(blockInfos);
            }).catch(err => {
                return reject(err);
            })
        })
    }
}

module.exports = service;
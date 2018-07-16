var call = require('./call');

var service = {
    getLatestBlock: () => {

        return new Promise((resolve, reject) => {
            call('getblockcount').then(result => {
                return JSON.parse(result).result;
            }).then(count => {
                const offset = count -9;
                const blockInfos = []
                console.log(offset);
                console.log(count);
                for(let i = offset; i<=count; i++){
                    call('getblockhash',i).then(result => {
                        const hash = JSON.parse(result).result;
                        call('getblock', hash).then(result => {
                            const blockInfo = JSON.parse(result).result;
                            blockInfos.push(blockInfo)
                        })
                    })
                }

                console.log(blockInfos);

                return resolve(blockInfos);
            }).catch(err => {
                return reject(err);
            })
        })
    }
}

module.exports = service;
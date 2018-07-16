var call = require('./call');

var service = {
    getLatestBlock: () => {

        return new Promise((resolve, reject) => {
            call('getblockcount').then(result => {
                return JSON.parse(result).result;
            }).then(async count => {
                const offset = count -9;
                const blockInfos = []
                console.log(offset);
                console.log(count);

                for(let i = offset; i<=count; i++){
                    await call('getblockhash',i).then(async result => {
                        const hash = JSON.parse(result).result;
                        await call('getblock', hash).then(async result => {
                            const blockInfo = JSON.parse(result).result;
                            await blockInfos.push(blockInfo)
                        })
                    })
                }

                console.log(blockInfos);

                return await resolve(blockInfos);
            }).catch(err => {
                return reject(err);
            })
        })
    }
}

module.exports = service;
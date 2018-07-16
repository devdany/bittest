var call = require('./call');

var service = {
    getLatestBlock: () => {

        return new Promise((resolve, reject) => {
            call('getblockcount').then(result => {
                return JSON.parse(result).result;
            }).then(async count => {
                const offset = count -9;
                const blockInfoIterator = []

                for(let i = offset; i<=count; i++){
                    blockInfoIterator.push(i)
                }

                return blockInfoIterator;
            }).then(async iterator => {
                return await Promise.all(iterator.map(async val => {
                    return await call('getblockhash',val).then(async result => {
                        return await JSON.parse(result).result;
                    })
                }))
            }).then(async hashes => {
                console.log(hashes);
            })
        })
    }
}

module.exports = service;

/*

await call('getblockhash',i).then(async result => {
    const hash = JSON.parse(result).result;
    await call('getblock', hash).then(async result => {
        const blockInfo = JSON.parse(result).result;
        await blockInfos.push(blockInfo)
    })
})*/

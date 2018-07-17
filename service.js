var call = require('./call');

const idxPerPage = 10;

var service = {
    getLatestBlock: () => {
        return new Promise((resolve, reject) => {
            call('getblockcount').then(result => {
                return JSON.parse(result).result;
            }).then(async count => {
                return await call('getblockhash', count).then(async result => {
                    return await JSON.parse(result).result;
                }).catch(err => {
                    console.log(err);
                })
            }).then(async hash => {
                return await call('getblock', '"' + hash + '"').then(async blockinfo => {
                    return await JSON.parse(blockinfo).result
                }).catch(err => {
                    console.log(err);
                })
            }).then(results => {
                return resolve(results);
            }).catch(err => {
                return reject(err);
            })
        })
    },
    getBlocksByPage: (page) => {
        return new Promise((resolve, reject) => {
            call('getblockcount').then(result => {
                return JSON.parse(result).result
            }).then(async count => {
                count = count - (page - 1) * idxPerPage;

                const offset = count - (idxPerPage - 1);
                const blockInfoIterator = []

                for (let i = offset; i <= count; i++) {
                    blockInfoIterator.push(i)
                }

                return blockInfoIterator;
            }).then(async iterator => {
                return await Promise.all(iterator.map(async val => {
                    return await call('getblockhash', val).then(async result => {
                        return await JSON.parse(result).result;
                    }).catch(err => {
                        console.log(err);
                    })
                }))
            }).then(async hashes => {
                return await Promise.all(hashes.map(async hash => {
                    return await call('getblock', '"' + hash + '"').then(async blockinfo => {
                        return await JSON.parse(blockinfo).result
                    }).catch(err => {
                        console.log(err);
                    })
                }))
            }).then(results => {
                return resolve(results);
            }).catch(err => {
                return reject(err);
            })
        })
    },
    getBlock: (hash) => {
        return new Promise((resolve, reject) => {
            call('getblock', '"' + hash + '"').then(async blockinfo => {
                return await JSON.parse(blockinfo).result
            }).then(result => {
                return resolve(result);
            }).catch(err => {
                return reject(err);
            })
        })
    }
}

module.exports = service;


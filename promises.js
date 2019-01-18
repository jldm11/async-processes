const async = require('async')

const args = process.argv;
const processing = args[2] || 'series';

const firstAsyncProcess = function () {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            console.log('First process is done')
            resolve(1)
        }, 5000)
    })
}

const secondAsyncProcess = function () {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            console.log('Second process is done')
            resolve(2)
        }, 2000)
    })
}

const thirdAsyncProcess = function () {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            console.log('Third process is done')
            resolve(3)
        }, 6000)
    })
}

if (processing === 'series') {
    console.log('Executing processes in series')
    async.series([
        async.asyncify(() => firstAsyncProcess()),
        async.asyncify(() => secondAsyncProcess()),
        async.asyncify(() => thirdAsyncProcess())
    ], function (err, results) {
        if (err)
            console.log(err)

        console.log('All processes are done')
        console.log('Results:', results)
    })
} else {
    console.log('Executing processes in parallel')
    async.parallel([
        async.asyncify(() => firstAsyncProcess()),
        async.asyncify(() => secondAsyncProcess()),
        async.asyncify(() => thirdAsyncProcess())
    ], function (err, results) {
        if (err)
            console.log(err)

        console.log('All processes are done')
        console.log('Results:', results)
    })
}
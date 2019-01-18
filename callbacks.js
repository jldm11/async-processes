const async = require('async')

const args = process.argv;
const processing = args[2] || 'series';

const firstAsyncProcess = function (callback) {
    setTimeout(function () {
        console.log('First process is done')
        callback(null, 1)
    }, 5000)
}

const secondAsyncProcess = function (callback) {
    setTimeout(function () {
        console.log('Second process is done')
        callback(null, 2)
    }, 2000)
}

const thirdAsyncProcess = function (callback) {
    setTimeout(function () {
        console.log('Third process is done')
        callback(null, 3)
    }, 6000)
}

if (processing === 'series') {
    console.log('Executing processes in series')
    async.series([
        firstAsyncProcess,
        secondAsyncProcess,
        thirdAsyncProcess
    ], function (err, results) {
        if (err)
            console.log(err)

        console.log('All processes are done')
        console.log('Results:', results)
    })
} else {
    console.log('Executing processes in parallel')
    async.parallel([
        firstAsyncProcess,
        secondAsyncProcess,
        thirdAsyncProcess
    ], function (err, results) {
        if (err)
            console.log(err)

        console.log('All processes are done')
        console.log('Results:', results)
    })
}
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
    async function series() {
        let result1 = await firstAsyncProcess()
        let result2 = await secondAsyncProcess()
        let result3 = await thirdAsyncProcess()

        const results = [
            result1,
            result2,
            result3
        ]

        console.log('All processes are done')
        console.log('Results:', results)
        return results
    }

    series()
} else {
    console.log('Executing processes in parallel')

    async function parallel() {
        let result1 = firstAsyncProcess()
        let result2 = secondAsyncProcess()
        let result3 = thirdAsyncProcess()

        const results = [
            await result1,
            await result2,
            await result3
        ]

        console.log('All processes are done')
        console.log('Results:', results)
        return results
    }

    parallel()
}
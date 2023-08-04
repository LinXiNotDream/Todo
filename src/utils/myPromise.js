const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

class MyPromise {
    status = PENDING
    value = null
    reason = null
    onFulfilledCbs = []
    onRejectedCbs = []
    constructor (exec) {
        exec(this.resolve.bind(this), this.reject.bind(this))
    }
    resolve (value) {
        if (this.status === PENDING) {
            this.status = FULFILLED;
            this.value = value
            this.onFulfilledCbs.forEach(func => func(value))
        }
    }
    reject (reason) {
        if (this.status === PENDING) {
            this.status = REJECTED;
            this.reason = reason;
            this.onRejectedCbs.forEach(func => func(reason))
        }
    }
    then (onFulfilled, onRejected) {
        const promise = new MyPromise((resolve, reject) => {
            const fulfilledMicrotask = () => {
                queueMicrotask(() => {
                    const res = onFulfilled(this.value)
                    resolvePromise(promise, res, resolve, reject)
                })
            }
            const rejectedMicrotask = () => {
                queueMicrotask(() => {
                    const res = onRejected(this.reason)
                    resolvePromise(promise, res, resolve, reject)
                })
            }
            if (this.status === FULFILLED) {
                fulfilledMicrotask()
            } else if (this.status === REJECTED) {
                rejectedMicrotask()
            } else {
                this.onFulfilledCbs.push(fulfilledMicrotask)
                this.onRejectedCb.push(rejectedMicrotask)
            }
        })
        return promise
    }
}

function resolvePromise (promise, value, resolve, reject) {
    if (promise === value) {
        return reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
    }
    if (typeof value === 'object' || typeof value === 'function') {
        if (value === null) {
            return resolve(value)
        }
        try {
            if (typeof value.then === 'function') {
                value.then(resolve, reject)
            } else {
                resolve(value)
            }
        } catch (err) {
            reject(err)
        }
    } else {
        resolve(value)
    }
}
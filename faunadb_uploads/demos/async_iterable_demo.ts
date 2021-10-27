const IterableMockRequests = require('../modules/mock_request.ts')

const asyncIterable = {
  ...IterableMockRequests,
  [Symbol.asyncIterator]() {
    return {
      i: 0,
      next() {
        if (this.i < 3) {
          return asyncIterable[this.i]()
          .then(
            // resolver function
            v => {
              this.i++
              return ({ value: v, done: false })
            }
          )
        }
        return Promise.resolve({ value: null, done: true })
      }
    }
  }
}

const asyncIterableLooper  = async function() {
   for await (let item of asyncIterable) {
     console.log(item);
   }
}

asyncIterableLooper()




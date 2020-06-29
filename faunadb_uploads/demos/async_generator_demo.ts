const MockRequests = require('../modules/mock_request.ts')

// this scripts demonstrates how to asynchronously iterate through 
// mock requests that have different or unknown durations.

async function* asyncGenerator(iterable) {
  for (let mockRequest of iterable) {
    const result = await mockRequest()
    yield result
  }
}

const asyncLooper = async function() {
  for await (let request of asyncGenerator(MockRequests)) {
    console.log(request);
  }
}

asyncLooper()

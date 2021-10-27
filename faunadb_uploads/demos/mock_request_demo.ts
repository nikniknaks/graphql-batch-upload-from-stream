
const fs = require('fs')
const Requests = require('../modules/mock_request.ts')
const readStream = fs.createReadStream('../data/words.json', { encoding: "utf-8"} );

// this script demos the use of async iteration to read chunks of a stream
// while making mock requests (which represent uploads of chunks)

const looper = async () => {
  for (let request of Requests) {
    const streamContent = await readStream.read()

    // console.log('typeof streamContent: ', typeof streamContent)

    console.log('streamContent.length: ', streamContent ? streamContent.length : streamContent)

    console.log('streamContent: ', streamContent)

    const result = await request()
    console.log('result: ', result)
  }
}

looper()

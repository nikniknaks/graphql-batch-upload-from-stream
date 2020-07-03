
const fs = require('fs')
const { pipeline } = require('stream')
const { Duplex } = require('stream')
const { Transform } = require('stream')
const { Readable } = require('stream');


const { parser } = require('stream-json/Parser')
const {filter} = require('stream-json/filters/Filter')
const { streamValues } = require('stream-json/streamers/StreamValues')
const { streamArray } = require('stream-json/streamers/StreamArray')
const { pick } = require('stream-json/filters/Pick')

// const {streamObject} = require('stream-json/streamers/StreamObject');

const Requests = require('../modules/mock_request.ts')
const AddWord = require('../modules/faunadb_addword.ts')
const AsyncRequestGenerator = require('../modules/async_request_generator.ts')

const request = Requests[2]

const filterTransformStream = new Transform({
  writableObjectMode: true,
  readableObjectMode: true,
  transform(chunk, encoding, callback) {
    if (chunk.name === "stringValue") {
      this.push(AddWord.AddWord(chunk.value))
    }
    callback()
  }
})

const batchingStream = new Transform({
  writableObjectMode: true,
  readableObjectMode: true,
  transform: function (chunk, encoding, callback) {
    // const accumulator = Buffer.from(chunk)
    // console.log('accumulator:', accumulator)
    // console.log('Buffer.byteLength(accumulator):', Buffer.byteLength(accumulator))
    // console.log('accumulator.toString(): ', accumulator.toString())
    this.push(chunk)
    callback()
  }
})

const uploadStream = fs.createReadStream(
    '../data/words.json',
    { encoding: "utf-8" })
  .pipe(parser())
  .pipe(filterTransformStream)
  .pipe(batchingStream)

// uploadStream.on('data', data => console.log(data))

const looper = async (stream) => {
  let counter = 0;
  let accumulator = []
  for await (const chunk of stream) {
    if (counter === 30000) {
      accumulator.push(chunk)
      const response = await request(accumulator)
      counter = 0
      accumulator = []
      console.log(response)
    } else {
      accumulator.push(chunk)
      counter++
    }
  }
}

looper(uploadStream)

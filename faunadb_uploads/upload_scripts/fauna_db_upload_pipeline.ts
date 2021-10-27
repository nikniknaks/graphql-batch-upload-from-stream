
const fs = require('fs')
const { pipeline } = require('stream')
const { Duplex } = require('stream')
const { Transform } = require('stream')
const { Readable } = require('stream');

const gql = require('graphql-tag')

const { parser } = require('stream-json/Parser')
const {filter} = require('stream-json/filters/Filter')
const { streamValues } = require('stream-json/streamers/StreamValues')
const { streamArray } = require('stream-json/streamers/StreamArray')
const { pick } = require('stream-json/filters/Pick')

// const {streamObject} = require('stream-json/streamers/StreamObject');

const Requests = require('../modules/mock_request.ts')
const AddWord = require('../modules/faunadb_addword.ts')
const AsyncRequestGenerator = require('../modules/async_request_generator.ts')
const postDataFaunaDB = require('../modules/faunadb_graphql_query.ts')
const faunaDBBatch = require('../modules/faunadb_graphql_batch_template.ts')
const postMultiDataFaunaDB = require('../modules/faunadb_graphql_query_multiple.ts')


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

let query = gql`${fs.readFileSync('../graphql_queries/add_word_paramd.gql', 'utf8')}`
// console.log(query)

const looper = async (stream) => {
  let counter = 0;
  let accumulator = []
  let chunkCounter = 0
  for await (const chunk of stream) {
    chunkCounter++
    if (chunkCounter > 159866) {
      // if (counter === 30000) {
      if (counter === 600) {
        // console.log(chunk)
        // console.log(counter)
        accumulator.push(chunk)
        const batchedGQLquery = faunaDBBatch(accumulator)
        // const response = await postDataFaunaDB(query, chunk)
        const response = await postMultiDataFaunaDB(batchedGQLquery)
        console.log(response)
        // const response = await request(accumulator)
        counter = 0
        // counter++
        accumulator = []
      } else {
        accumulator.push(chunk)
        counter++
      }
    }
  }
}

looper(uploadStream)

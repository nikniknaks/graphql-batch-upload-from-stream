const fs = require('fs')
const { Transform } = require('stream')

const faunadb = require('faunadb')
const q = faunadb.query
const client = new faunadb.Client({ secret: 'fnADiA-EnVACEoyq9QW8r1OPDF6W6uZLnIdf17vH' })

const gql = require('graphql-tag')
const { parser } = require('stream-json/Parser')

const AddWordTwo = require('../modules/addword_two.ts')
const AsyncRequestGenerator = require('../modules/async_request_generator.ts')
const postDataFaunaDB = require('../modules/faunadb_graphql_query.ts')
const faunaDBBatch = require('../modules/faunadb_graphql_batch_template.ts')
const postMultiDataFaunaDB = require('../modules/faunadb_graphql_query_multiple.ts')

const filterTransformStream = new Transform({
  writableObjectMode: true,
  readableObjectMode: true,
  transform(chunk, encoding, callback) {
    if (chunk.name === "stringValue") {
      this.push(AddWordTwo.AddWordTwo(chunk.value))
    }
    callback()
  }
})

const batchingStream = new Transform({
  writableObjectMode: true,
  readableObjectMode: true,
  transform: function (chunk, encoding, callback) {
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

// Define the FaunaDB function for uploading data.
const faunaDBQuery = (documentArray) => {
  client.query(
    documentArray.forEach(v => {
      q.Create(
        q.Collection('WordsTwo'),
        {
          data: {
            name: 'Mountainous Thunder',
            element: 'air',
            cost: 15,
          },
        },
      )
    }
    )
  ).then(function (response) {
    console.log(response); // Logs the ref to the console.
  }).catch(function (error) {
    console.log(error.description)
  })
}

const looper = async (stream) => {
  let counter = 0;
  let accumulator = []
  let chunkCounter = 0
  for await (const chunk of stream) {
    chunkCounter++
    if (counter === 600) {
      accumulator.push(chunk)
      const response = await faunaDBQuery(accumulator)
      console.log(response)
      counter = 0
      accumulator = []
    } else {
      accumulator.push(chunk)
      counter++
    }
  }
}

looper(uploadStream)

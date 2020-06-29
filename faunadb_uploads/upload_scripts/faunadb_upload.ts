const fs = require('fs')
const { readFile } = require("fs")

const Parser = require('stream-json/Parser')

const AddWord = require('../modules/faunadb_addword.ts')
// const CreateSubsets = require('../modules/faunadb_word_subsets.ts')

const parser = new Parser({packValues: true, streamValues: false});

var readStream = fs.createReadStream('../data/words.json',{ encoding: "utf-8" })

var counter = 0
let wordArrays = []

parser.on(
  'data',
  data => {
    // console.log(data)
    if (data.name === 'stringValue') {
      // console.log(data.value, data.value.length, counter)

      const wordObject = AddWord.AddWord(data.value)
      console.log(wordObject)
      // CreateSubsets(counter, wordArrays, wordObject)

      counter++
      console.log(counter)
      return wordObject
    }
  }
)

parser.on('end', () => console.log(`End stream.`));

const parsedStream = readStream.pipe(parser)

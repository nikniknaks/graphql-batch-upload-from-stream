const fs = require('fs')

async function logLines(lineIterable) {
  for await (const line of lineIterable) {
    await mockRequestOne()
    console.log(line);
  }
}

let readStream = fs.createReadStream('../data/words.json', {encoding: "utf-8"});
// logLines(readStream)

console.log(typeof readStream[Symbol.iterator])
const fs = require('fs')

var counter = 0
var readStream = fs.createReadStream('../data/words.json', {
  encoding: "utf-8"
});

readStream.on("readable", function () {
  console.log("There is some data to read now.");

  let chunk;
  while (null !== (chunk = readStream.read())) {
    console.log(chunk)
    console.log(`Received ${chunk.length} bytes of data.`);
    console.log(counter)
  }
  counter++
});

readStream.read();

readStream.on("data", () => console.log("Emit data event."));
readStream.on("end", () => console.log("Stream end."));
readStream.on("close", () => console.log("Stream closed."));

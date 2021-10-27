var fs = require('fs');

console.log("Parse JSON file; Convert object to array");
console.log("File to parse: ", process.argv[2])
const inputFileName = process.argv[2]

 
fs.readFile(inputFileName, 'utf8', function(err, contents) {
  if(err) {
        return console.log(err);
    }
  const object = JSON.parse(contents)
  const array = Object.keys(object)
  const json = JSON.stringify(array)
  fs.writeFile("words.json", json, function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("The file was saved!");
  }); 
});
 
console.log('after calling readFile');
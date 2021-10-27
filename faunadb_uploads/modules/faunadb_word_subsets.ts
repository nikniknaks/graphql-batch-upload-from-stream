const createSubsets = (counter, wordArrays, document) => {
  // console.log(counter/1000)
  const subset = Math.floor(counter / 1000)
  // console.log(subset, Number.isInteger(counter/1000))

  if (Number.isInteger(counter / 1000)) {
    // console.log('new subset: ', subset)
    wordArrays[subset] = new Array()
  }

  wordArrays[subset].push(document)
  // console.log('wordArrays[' + subset + ']: ', wordArrays[subset])
  // console.log(Math.ceil(counter/1000), wordArrays[Math.ceil(counter/1000)])
  // console.log(wordArrays[Math.ceil(counter/1000)])
}

module.exports = createSubsets
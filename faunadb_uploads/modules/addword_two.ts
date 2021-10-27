const constructLetters = (word) => {
  const letterArray = word.split("")
  return letterArray.reduce((accum, value) => {
    if (accum[value] >= 1) {
      accum[value]++
      return accum
    } else {
      return {
        ...accum,
        [value]: 1
      } 
    }
  },{})
}

const AddWordTwo = (word) => ({
  word: word,
  letters: constructLetters(word),
  length: word.length
})

exports.AddWordTwo = AddWordTwo

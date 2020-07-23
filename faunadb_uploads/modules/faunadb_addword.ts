const constructLetters = (word) => {
  return word.split('').reduce(
    (acc, cur) => {
      if (acc.map(v => v.letter).includes(cur)) {
        acc.forEach(v => v.letter === cur && v.occurrence++)
        return [...acc]
      } else {
        return [...acc, {
          letter: cur,
          occurrence: 1
        }]
      }
    },
    []
  )
}

const AddWord = (word) => ({
  word: word,
  letters: constructLetters(word),
  length: word.length
})

exports.AddWord = AddWord

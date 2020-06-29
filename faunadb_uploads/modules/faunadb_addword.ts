const constructLetters = (word) => {
  return word.split('').reduce(
    (acc, cur) => {
      if (acc.map(v => v.letter).includes(cur)) {
        acc.forEach(v => v.letter === cur && v.occurence++)
        return [...acc]
      } else {
        return [...acc, {
          letter: cur,
          occurence: 1
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

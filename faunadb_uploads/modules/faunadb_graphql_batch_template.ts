const gql = require('graphql-tag')

const faunaDBBatch = (docObjectArray) => {
  let batchedEntriesString = ''
  // console.log(docObjectArray)

  docObjectArray.forEach(v => {
    // console.log('docObject')
    const word = v.word
    let letters = ''
    const length = v.length

    v.letters.forEach((letter, i) => {
      // console.log(letter)
      letters += `${i > 0 ? `,`: ``}
      { 
        letter: "${letter.letter}"
        occurrence: ${letter.occurrence}
      }`
    })

    letters = `${letters}`

    const result = `
      ${word}: createWord(
        data: {
          word: "${word}"
          letters: [${letters}]
          length: ${length}
        }) {
        word
        letters {
          letter
          occurrence
        }
        length
      }
      `
    batchedEntriesString += result
    // console.log(result)

  })

  const batchedQuery = `mutation {
    ${batchedEntriesString}
  }`
  // console.log(batchedQuery)
  const tokenizedQuery = gql`${batchedQuery}`
  // console.log(tokenizedQuery.loc)
  return tokenizedQuery
}

module.exports = faunaDBBatch
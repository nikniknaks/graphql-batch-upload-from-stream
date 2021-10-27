const fs = require('fs');
const http = require("http")
const fetch = require('node-fetch')
const { loader } = require('graphql.macro')
const gql = require('graphql-tag')

let query = gql`${fs.readFileSync('../graphql_queries/add_word_paramd.gql', 'utf8')}`

const word = {
  word: "asinine",
  letters: [
      {
        letter: "a",
        occurrence: 3
      },{
        letter: "r",
        occurrence: 2
      },{
        letter: "d",
        occurrence: 1
      },{
        letter: "v",
        occurrence: 1
      },{
        letter: "r",
        occurrence: 1
      },{
        letter: "k",
        occurrence: 1
      }
    ],
  length: 8
}

const postDataFaunaDB = async (query, word) => {
  const response =
    await fetch("https://graphql.fauna.com/graphql",
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization : `Bearer fnADiA-EnVACEoyq9QW8r1OPDF6W6uZLnIdf17vH`,
        },
        body: JSON.stringify({
          query: query.loc.source.body,
          variables: { word: word }
        }),
      }
    )
  console.log(await response.json())
}

module.exports = postDataFaunaDB

const fs = require('fs');
const http = require("http")
const fetch = require('node-fetch')
const { loader } = require('graphql.macro')
const gql = require('graphql-tag')

// let query = gql`${fs.readFileSync('../graphql_queries/test.gql', 'utf8')}`

const postMultiDataFaunaDB = async (query) => {
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
        }),
      }
    )
  console.log(await response)
}

// postMultiDataFaunaDB(query)

module.exports = postMultiDataFaunaDB

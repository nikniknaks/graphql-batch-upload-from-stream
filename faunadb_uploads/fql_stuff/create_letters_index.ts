const faunadb = require('faunadb')
const q = faunadb.query
const client = new faunadb.Client({ secret: 'fnADiA-EnVACEoyq9QW8r1OPDF6W6uZLnIdf17vH' })

// Define the FaunaDB function for uploading data.
const faunaDBQuery = () => {
  client.query(
    q.CreateIndex({
      name: 'letters2',
      source: {
        collection: q.Collection('Word'),
        terms : [
          { binding: 'binding1'},
          { field: ['letters'] }
        ],
      },
    })
  ).then(function (response) {
    console.log(response); // Logs the ref to the console.
  }).catch(function (error) {
    console.log(error.description)
  })
}

faunaDBQuery() // Call the FaunaDB function for uploading data, for each wordArray.
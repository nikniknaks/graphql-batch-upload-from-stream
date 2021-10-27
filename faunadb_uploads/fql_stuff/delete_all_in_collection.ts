const faunadb = require('faunadb')
const q = faunadb.query
const client = new faunadb.Client({ secret: 'fnADiA-EnVACEoyq9QW8r1OPDF6W6uZLnIdf17vH' })

// Define the FaunaDB function for uploading data.
const faunaDBQuery = collectionName => {
  client.query(
    q.Map(
      q.Paginate(
        q.Documents(
          q.Collection(collectionName)
        )
      ),
      q.Lambda(
        'doc',
        q.Delete(
          q.Var('doc')
        )
      )
    )
  ).then(function (response) {
    console.log(response)
    // response.data.forEach(v => console.log((v.value.id)))// Logs the ref to the console.
  }).catch(function (error) {
    console.log(error.description)
  })
}

faunaDBQuery('Word') // Call the FaunaDB function for uploading data, for each wordArray.
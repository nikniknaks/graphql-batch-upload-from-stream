const faunadb = require('faunadb')
const q = faunadb.query
const client = new faunadb.Client({ secret: 'fnADiA-EnVACEoyq9QW8r1OPDF6W6uZLnIdf17vH' })

// Define the FaunaDB function for uploading data.
const faunaDBQuery = () => {
  client.query(
    q.Map(
      q.Paginate(
        q.Documents(
        q.Collection('Word')
        )
      ),
      q.Lambda(
        ["document"],
        q.Map(
          q.Select(
            ["data", "letters"],
            q.Get(
              q.Var("document")
            )
          ),
          q.Lambda(
            ['letter'],
            q.Var('letter')
          )
        )
      )
    )
  
    // q.Map(
    //   q.Paginate(q.Collection('Word')),
    //   q.Lambda(
    //     "doc",
    //     q.IsObject(
    //       "doc"
    //     )
    //   )
    // )
   
  ).then(function (response) {
    console.log(response); // Logs the ref to the console.
  }).catch(function (error) {
    console.log(error.description)
  })
}

const letters = ''

faunaDBQuery() // Call the FaunaDB function for uploading data, for each wordArray.
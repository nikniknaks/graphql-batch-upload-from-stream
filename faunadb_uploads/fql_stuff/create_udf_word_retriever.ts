const faunadb = require("faunadb");
const q = faunadb.query;
const client = new faunadb.Client({
  secret: "fnADiA-EnVACEoyq9QW8r1OPDF6W6uZLnIdf17vH",
});

// Define the FaunaDB function for uploading data.
const faunaDBQuery = () => {
  client
    .query(
      q.CreateFunction({
        name: 'word_retriever',
        body: q.Query(
          q.Lambda(
            ['graphql_object'],
            q.ToObject([
              [
                "data",
                q.Reduce(
                  // iterate over every document in collection
                  q.Lambda((accum, value) =>
                    q.Append(q.Select("data", q.Get(value)), accum)
                  ),
                  [], // accum initial
                  q.Filter(
                    // get the documents from the ref
                    q.Documents(
                      q.Collection("Word") // get ref to the collection
                    ),
                    // execute for each document
                    q.Lambda(
                      ["document"],
                      q.Equals(
                        ['graphql_object'],
                        q.Select(
                          // select 'letters' array from document
                          ["data", "letters"],
                          q.Get(q.Var("document"))
                        )
                      )
                    )
                  )
                ),
              ],
            ])
          )
        )
      })
    )
    .then(function (response) {
      console.log(response); // Logs the ref to the console.
    })
    .catch(function (error) {
      console.log(error.description);
    });
};

faunaDBQuery(); // Call the FaunaDB function for uploading data, for each wordArray.

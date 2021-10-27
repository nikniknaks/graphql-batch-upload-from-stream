const faunadb = require("faunadb");
const q = faunadb.query;
const client = new faunadb.Client({
  secret: "fnADiA-EnVACEoyq9QW8r1OPDF6W6uZLnIdf17vH",
});

// Define the FaunaDB function for uploading data.
const faunaDBQuery = () => {
  client
    .query(
      q.Paginate(
        // iterate over every document in collection
        q.Filter(
          // get the documents from the ref
          q.Documents(
            q.Collection("Word") // get ref to the collection
          ),
          // execute for each document
          q.Lambda(
            ["document"],
            q.Equals(
              [
                { letter: "a", occurrence: 2 },
                { letter: "b", occurrence: 1 },
                { letter: "c", occurrence: 1 },
                { letter: "u", occurrence: 1 },
                { letter: "s", occurrence: 1 },
              ],
              q.Select(
                // select 'letters' array from document
                ["data", "letters"],
                q.Get(q.Var("document"))
              )
            )
          )
        )
      )
    )
    .then(function (response) {
      console.log(response); // Logs the ref to the console.
    })
    .catch(function (error) {
      console.log(error.description);
    });
};

faunaDBQuery(); // Call the FaunaDB function for uploading data, for each wordArray.

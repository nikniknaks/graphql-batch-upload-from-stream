const { readFile } = require("fs");
const { resolve } = require("path");
const { request } = require("https");

const variables = {
  word: {
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
}

const loadQuery = (fileName) =>
  new Promise((res, reject) => {
    readFile(resolve(fileName), "utf-8", (err, data) => {
      err ? reject(err) : res(data);
    });
  });

const appendQuery = (fileName) => (query) =>
  loadQuery(fileName).then((results) => query + results);

// const buildBody = (query) =>
//   Promise.resolve({
//     body: JSON.stringify({ query }),
//   });

const buildBodyWithVariables = (variables) => (query) =>
  Promise.resolve({
    body: JSON.stringify({ query, variables }),
  });

const buildHeaders = ({ token }) => ({ body }) =>
  Promise.resolve({
    body,
    headers: {
      "Content-Type": "application/json",
      "Content-Length": body.length,
      Authorization: `Bearer ${token}`,
      connection: 'keep-alive'
    },
  });

const buildRequestOptions = ({ headers, body }) =>
  Promise.resolve({
    body,
    options: {
      method: "POST",
      host: "graphql.fauna.com",
      path: "/graphql",
      port: 443,
      headers,
    },
  });

const makeRequest = ({ options, body }) =>
  new Promise((resolve, reject) => {
    request(options, (res) => {
      let result = "";
      res.on("data", (chunk) => (result += chunk));
      res.on("end", () => resolve(JSON.parse(result)));
      res.on("error", (err) => reject(err));
      console.log(body)
    }).write(body);
  });

loadQuery("./add_word_paramd.gql")
  // .then(appendQuery("./add_word.gql"))
  .then(buildBodyWithVariables(variables))
  .then(buildHeaders({token: "fnADiA-EnVACEoyq9QW8r1OPDF6W6uZLnIdf17vH"}))
  .then(buildRequestOptions)
  .then(makeRequest)
  .then((results) => console.dir(results, { depth: null }));

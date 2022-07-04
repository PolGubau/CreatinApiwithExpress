const { response } = require("express");
const express = require("express");
const app = express();
let notes = [
  {
    id: 1,
    content: "HTML is so easy",
    date: "2018-05-30T17:30:31.098Z",
    important: true,
  },
  {
    id: 2,
    content: "CSS is easy",
    date: "2019-05-30T17:30:31.098Z",
    important: false,
  },
  {
    id: 3,
    content: "JS is easy",
    date: "2019-05-30T17:30:31.098Z",
    important: true,
  },
];

//
// const app = http.createServer((request, response) => {
//   response.writeHead(200, { "Content-Type": "application/json" });
//   response.end(JSON.stringify(notes));
// });
app.get("/", (request, response) => {
  response.send("<h1>Hello World</h1>");
});
app.get("/notes", (request, response) => {
  response.json(notes);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
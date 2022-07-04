const express = require("express");
const app = express();
app.use(express.json());
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
app.get("/api/notes", (request, response) => {
  response.json(notes);
});
app.get("/api/notes/:id", (request, response) => {
  const id = Number(request.params.id);
  const note = notes.find((note) => note.id === id);
  if (note) {
    response.send(note);
  } else {
    response.status(404).end();
  }
});
app.post("/api/notes", (request, response) => {
  const note = request.body;

  if (!note || !note.content) {
    return response.status(400).json({ error: "content missing" });
  }

  const ids = notes.map((note) => note.id);
  const maxId = Math.max(...ids);
  const newNote = {
    id: maxId + 1,
    content: note.content,
    date: new Date().toISOString(),
    important: typeof note.important !== "undefined" ? note.important : false,
  };
  notes = [...notes, newNote];
  response.status(201).json(newNote);
});

//
app.delete("/api/notes/:id", (request, response) => {
  const id = Number(request.params.id);
  const note = notes.find((note) => note.id !== id);
  response.status(204).end();
});

//
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});

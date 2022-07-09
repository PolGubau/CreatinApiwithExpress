require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());
require("./mongo"); //importamos esto para que se conecte

const Quest = require("./models/Quest");

const logger = require("./middlewares/logger");
const errorHandler = require("./middlewares/errorHandler");
const notFound = require("./middlewares/notFound");
app.use(logger); //nos dice el path

app.get("/", (request, response) => {
  response.send("<h1>Hello World</h1>");
});
app.get("/api/quests", (request, response) => {
  Quest.find({}).then((quests) => {
    response.json(quests);
  });
});
app.get("/api/quests/:id", (request, response, next) => {
  const { id } = request.params;
  Quest.findById(id)
    .then((quest) => {
      if (quest) {
        response.send(quest);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => {
      next(error);
      console.log(error);
    });
});
app.post("/api/quests", (request, response) => {
  const quest = request.body;

  if (!quest.title) {
    return response.status(400).json({ error: "content missing" });
  }
  const questToUpload = new Quest({
    title: quest.title,
    anwers: quest.answers,
    solution: quest.solution,
    creator: quest.creator,
    createdAt: new Date(),
    likes: quest.likes,
    incorrect: quest.incorrect,
  });
  questToUpload
    .save()
    .then((savedNote) => {
      response.json(savedNote);
    })
    .catch((error) => {
      console.log("Error en el POST: ", error);
    });
});
//
app.put("/api/quests/:id", (request, response, next) => {
  const { id } = request.params;
  const quest = request.body;
  const newNoteInfo = {
    title: quest.title,
    anwers: quest.anwers,
    solution: quest.solution,
    creator: quest.creator,
    createdAt: quest.createdAt,
    likes: quest.likes,
    incorrect: quest.incorrect,
  };
  Quest.findByIdAndUpdate(id, newNoteInfo, { new: true })
    .then((result) => {
      response.json(result);
    })
    .catch((error) => {
      next(error);
      console.log(error);
    });
});

// delete quest
app.delete("/api/quests/:id", (request, response) => {
  const { id } = request.params;
  Note.findByIdAndDelete(id)
    .then((result) => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

app.use(notFound); //donde caen los errores de 404
app.use(errorHandler); //donde caen los errores

// puerto definido en .env
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});

module.exports = { app, server };

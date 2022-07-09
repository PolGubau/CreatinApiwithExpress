const mongoose = require("mongoose");

const { model, Schema } = mongoose;
//esquema para crear una clase para las quests
const questSchema = new Schema({
  title: String,
  anwers: Array,
  solution: String,
  creator: String,
  createdAt: Date,
  likes: Number,
  incorrect: Number,
});

questSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});
//modelo para crear notas
const Quest = model("Quest", questSchema);

module.exports = Quest;

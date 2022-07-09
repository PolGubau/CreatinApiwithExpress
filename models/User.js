const mongoose = require("mongoose");

const { model, Schema } = mongoose;
//esquema para crear una clase para las quests
const userSchema = new Schema({
  username: String,
  name: String,
  passwordHash: String,
  email: String,
  notes: [{ type: Schema.Types.ObjectId, ref: "Quest" }],
});

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
  },
});
//modelo para crear notas
const User = model("User", userSchema);

module.exports = User;

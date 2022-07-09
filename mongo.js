//conexion a mongo
const mongoose = require("mongoose");
const { MONGO_DB_URI, MONGO_DB_URI_TEST, NODE_ENV } = process.env;
const connectingString = NODE_ENV === "test" ? MONGO_DB_URI_TEST : MONGO_DB_URI;
mongoose
  .connect(connectingString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("conectado a mongo");
  })
  .catch((err) => {
    console.error(err);
  });

process.on("uncaughtException", () => {
  mongoose.connection.disconnect();
});

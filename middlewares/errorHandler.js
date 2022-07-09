const errorHandler = (error, request, response, next) => {
  console.log("Error: ", error);
  if (error.name === "CastError") {
    response.status(400).send({ error: "Invalid ID supplied" });
  } else {
    response.status(500).end();
  }
};
module.exports = errorHandler;

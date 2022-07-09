const notFound = (request, response, next) => {
  response.status(404).send("404 not found");
};
module.exports = notFound;

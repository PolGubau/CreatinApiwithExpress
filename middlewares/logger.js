const logger = (request, response, next) => {
  console.log("Searched path: ", request.path);
  next();
};
module.exports = logger;

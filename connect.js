const { connect } = require("mongoose");

function connectToMongoDb(connectionString) {
  return connect(connectionString);
}

module.exports = {
  connectToMongoDb,
};

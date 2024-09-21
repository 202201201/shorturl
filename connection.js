const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

async function connectMongoDB(url) {
  // Connection With Mongoose
  return mongoose.connect(url);
}
module.exports = { connectMongoDB };

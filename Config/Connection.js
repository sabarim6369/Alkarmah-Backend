const mongoose = require("mongoose");

const ConnectDb = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/alkarmah");
    console.log("MongoDB Connected");
  } catch (err) {
    console.log(err);
  }
};

module.exports = ConnectDb;

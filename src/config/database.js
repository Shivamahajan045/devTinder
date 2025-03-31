const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://shivamahajan:TBVDmzW7Z6sYlPMU@cluster0.jnt5n.mongodb.net/devTinder?retryWrites=true&w=majority"
    );
  } catch (error) {
    console.error(`Failed to connect to MongoDB:`, error.message);
  }
};

module.exports = connectDB;

const mongoose = require('mongoose');

// This function connects our server to MongoDB Atlas
const connectDB = async () => {
  try {
    // We use process.env to keep the database password hidden
    const conn = await mongoose.connect(process.env.MONGO_URI);
    
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Database Connection Error: ${error.message}`);
    // Exit the process if the connection fails (Code 1 means failure)
    process.exit(1);
  }
};

module.exports = connectDB;
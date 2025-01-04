import mongoose from 'mongoose';

// MongoDB URI (Connection string)
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/parcel-monitoring';  

// Function to connect to MongoDB
const connectDB = async () => {
  try {
    // Use mongoose to connect to MongoDB
    const connection = await mongoose.connect(mongoURI, {
      useNewUrlParser: true,   
      useUnifiedTopology: true,    
    });

    console.log(`MongoDB connected: ${connection.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;

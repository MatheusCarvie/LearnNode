import mongoose from "mongoose";

const connectToDatabase = async (): Promise<void> => {
  try {
    await mongoose.connect(String(process.env.DB_CONNECT));
    console.log("Connected to MongoDB database");
  } catch (error) {
    console.error("Error connecting to MongoDB database: ", error);
    process.exit(1);
  }
};

export default connectToDatabase;

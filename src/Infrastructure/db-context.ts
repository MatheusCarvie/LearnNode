import mongoose from "mongoose";

const connectToDatabase = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.DB_CONNECT as string);
    console.log("Connected to MongoDB database");
  } catch (error) {
    console.error("Error connecting to MongoDB database: ", error);
    process.exit(1);
  }
};

export default connectToDatabase;

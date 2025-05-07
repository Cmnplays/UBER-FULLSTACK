import mongoose from "mongoose";
const DB_URI = process.env.DB_URI;

const connectToDb = async () => {
  try {
    const mongodbConnectionInstance = await mongoose.connect(DB_URI);
    console.log(
      "Successfully connected to database ::",
      mongodbConnectionInstance.connection.client.s.url
    );
  } catch (error) {
    console.log("Error while connecting to database ::", error.message);
    process.exit(1);
  }
};
export default connectToDb;

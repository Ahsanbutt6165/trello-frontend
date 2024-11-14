import { connect } from "mongoose";

const connectToMongo = async () => {
  try {
    await connect(process.env.MONGO_DB_URI, {
      dbName: "kananboard",
    });
    console.log(" ----data base connected successfully----");
  } catch (error) {
    console.log(error);
  }
};

export default connectToMongo;

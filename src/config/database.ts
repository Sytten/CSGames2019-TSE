import * as mongoose from "mongoose";

export let configure = () => {
  const mongoDB = process.env.MONGODB_URI;
  mongoose.connect(mongoDB, { useNewUrlParser: true });

  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "MongoDB connection error:"));
};

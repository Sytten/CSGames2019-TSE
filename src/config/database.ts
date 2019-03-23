import * as mongoose from 'mongoose';

export let configure = () => {
  let mongoDB = process.env.MONGODB_URI;
  mongoose.connect(mongoDB, { useNewUrlParser: true });

  let db = mongoose.connection;
  db.on('error', console.error.bind(console, 'MongoDB connection error:'));
};

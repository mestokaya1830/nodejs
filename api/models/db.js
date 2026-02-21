import Mongoose from "mongoose";

Mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('MongoDB Connected'))
  .catch((error) => console.log('MongoDB Connection Error:', error));

export default Mongoose.connection;
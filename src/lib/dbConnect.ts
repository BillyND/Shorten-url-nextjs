import mongoose from "mongoose";
require("dotenv").config();

const MONGODB_URI: any = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("===> Please add your Mongo URI to .env.local");
}

let cached: { conn: any; promise: any } = { conn: null, promise: null };

async function dbConnect() {
  if (cached.conn) {
    console.log("===> Connected to DB");
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;

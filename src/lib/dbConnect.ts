import mongoose, { ConnectOptions, Mongoose } from "mongoose";
import { Db } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const MONGODB_URI: string = process.env.MONGODB_URI || "";

if (!MONGODB_URI) {
  throw new Error("Please add your Mongo URI to .env.local");
}

let cached: { conn?: Mongoose; promise?: Promise<Mongoose> } = {};

async function bufferCommands(): Promise<Db> {
  if (cached.conn) {
    console.log("=> Using existing database connection");
    return cached.conn.connection.db;
  }

  if (!cached.promise) {
    const opts: ConnectOptions = {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }

  cached.conn = await cached.promise;
  console.log("=> New database connection");
  return cached.conn.connection.db;
}

export default dbConnect;

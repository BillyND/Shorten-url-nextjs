import mongoose, { ConnectOptions, Mongoose } from "mongoose";
import { Db } from "mongodb";

const MONGODB_URI: string = process.env.MONGODB_URI || "";

// Check if the database is local
const isLocalDtb = MONGODB_URI?.includes("localhost");

if (!MONGODB_URI) {
  throw new Error("Please add your Mongo URI to .env.local");
}

let cached: { conn?: Mongoose; promise?: Promise<Mongoose> } = {};

async function dbConnect(): Promise<Db> {
  if (cached.conn) {
    return cached.conn.connection.db;
  }

  if (!cached.promise) {
    // Set connection options based on environment (local or remote)
    const options: ConnectOptions = !isLocalDtb
      ? {
          user: process.env.DB_USER,
          pass: process.env.DB_PASSWORD,
          dbName: process.env.DB_NAME,
        }
      : {};

    cached.promise = mongoose.connect(MONGODB_URI, options).then((mongoose) => {
      return mongoose;
    });
  }

  cached.conn = await cached.promise;
  console.log("=> New database connection");
  return cached.conn.connection.db;
}

export default dbConnect;

import type { Mongoose } from "mongoose";
import mongoose from "mongoose";

const connectionString = `${process.env.MONGODB_URI}`;
const cached: { conn?: Mongoose; promise?: Promise<Mongoose> } = {};

(async function (): Promise<any> {
  if (cached.conn) {
    console.log("==> Exist database connection");
    return cached.conn.connection.db;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(connectionString).then((mongoose) => {
      return mongoose;
    });
  }

  cached.conn = await cached.promise;
  console.log("==> New database connection");
  return cached.conn.connection.db;
})();

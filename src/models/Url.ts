// src/models/Url.ts
import mongoose, { Document, Model, Schema } from "mongoose";

export interface IUrl extends Document {
  shortId: string;
  originalUrl: string;
}

const urlSchema: Schema<IUrl> = new Schema({
  shortId: { type: String, required: true, unique: true },
  originalUrl: { type: String, required: true },
});

const Url: Model<IUrl> =
  mongoose.models.Url || mongoose.model<IUrl>("Url", urlSchema);

export default Url;

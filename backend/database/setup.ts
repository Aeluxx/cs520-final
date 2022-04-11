import mongoose from "mongoose";
import schemas from "./schemas";

const models: { [key: string]: typeof mongoose.Model } = {};

async function run() {
  await mongoose.connect(process.env.DATABASE_URL);
  Object.keys(schemas).forEach(key => {
    models[key] = mongoose.model(key, schemas[key]);
  });
}

export { run, models };

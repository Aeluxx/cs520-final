import mongoose from "mongoose";
import { Classes, Notes, Users } from "./schemas";

async function connect() {
  if (!process.env.DATABASE_URL)
    require("dotenv").config({ path: `.env.local` });
  await mongoose.connect(process.env.DATABASE_URL ?? "Error");
}

async function getModels() {
  await connect();
  return {
    Users: mongoose.model("Users", Users),
    Classes: mongoose.model("Classes", Classes),
    Notes: mongoose.model("Notes", Notes),
  };
}

function disconnect() {
  mongoose.disconnect();
}

const models = getModels();
export { models, disconnect };

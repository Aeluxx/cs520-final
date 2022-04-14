// import * as mongoDB from "mongodb";
import { Collection, Db, MongoClient } from "mongodb";
import { NoteData } from "../models/note";
import { SectionData } from "../models/section";
import { UserData } from "../models/user";
import { config } from "dotenv";

const collections: {
  notes?: Collection<NoteData>;
  sections?: Collection<SectionData>;
  users?: Collection<UserData>;
} = {};

let _connection: MongoClient = undefined;

async function getConnection() {
  config({ path: `.env.local` });
  _connection = new MongoClient(process.env.DB_URL ?? "ERROR");
  await _connection.connect();

  const db: Db = _connection.db(process.env.DB ?? "ERROR");

  collections.users = db.collection("users");
  collections.sections = db.collection("sections");
  collections.notes = db.collection("notes");

  return _connection;
}

function closeConnection() {
  return _connection.close();
}

export { getConnection as connect, collections, closeConnection as disconnect };

// import * as mongoDB from "mongodb";
import { Collection, Db, MongoClient } from "mongodb";
import { NoteData } from "../models/note";
import { SectionData } from "../models/section";
import { UserData } from "../models/user";
import { config } from "dotenv";

/**
 * The collections in the database.
 * 
 * @type {Collection<UserData>} users The collection of users.
 * @type {Collection<SectionData>} sections The collection of sections.
 * @type {Collection<NoteData>} notes The collection of notes.
 */
const collections: {
  notes?: Collection<NoteData>;
  sections?: Collection<SectionData>;
  users?: Collection<UserData>;
} = {};

/**
 * The current connection to the database.
 */
let _connection: MongoClient;

/**
 * Get the connection to the database.
 * @returns {Promise<MongoClient>} The connection to the database.
 */
async function getConnection(): Promise<MongoClient> {
  config({ path: `.env.local` });
  _connection = new MongoClient(process.env.DB_URL ?? "ERROR");
  await _connection.connect();

  const db: Db = _connection.db(process.env.DB ?? "ERROR");

  collections.users = db.collection("users");
  collections.sections = db.collection("sections");
  collections.notes = db.collection("notes");

  return _connection;
}

/**
 * Disconnect from the database.
 */
async function closeConnection() {
  await _connection.close();
}

export { getConnection as connect, collections, closeConnection as disconnect };

import { ObjectId } from "mongodb";
import { Note, NoteData } from "../models/note";
import { Section } from "../models/section";
import { collections } from "../setup/setup";

function getNote(noteData: NoteData): Note {
  const note = noteData as Note;
  note.reload = async function r(): Promise<Note> {
    return Object.assign(this, (await find({ _id: this._id }))[0]);
  };
  return note;
}

async function insert(
  title: string,
  content: string,
  section: Section
): Promise<Note> {
  const res = await collections.notes.insertOne({
    _id: new ObjectId(),
    title,
    content,
    sectionId: section._id,
  });
  return (await find({ _id: res.insertedId }))[0];
}

async function find(filter: any): Promise<Note[]> {
  return (await collections.notes.find(filter).toArray()).map(getNote);
}

function remove(filter: any) {
  return collections.notes.deleteMany(filter);
}

async function update(note: Note, data: any): Promise<Note> {
  if ("_id" in data) {
    throw new Error("Cannot update _id");
  }
  await collections.notes.updateOne({ _id: note._id }, { $set: data });
  return note.reload();
}

export { insert, find, remove, update };

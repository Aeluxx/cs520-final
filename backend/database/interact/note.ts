import { ObjectId } from "mongodb";
import { Note, NoteData } from "../models/note";
import { Section } from "../models/section";
import { collections } from "../setup/setup";

/**
 * Converts a NoteData object to a Note object.
 * 
 * @param noteData The data to create the note with
 * @returns A Note object with the data
 */
function getNote(noteData: NoteData): Note {
  const note = noteData as Note;
  note.reload = async function r(): Promise<Note> {
    return Object.assign(this, (await find({ _id: this._id }))[0]);
  };
  return note;
}

/**
 * Inserts a note into the database.
 * 
 * @param title The title of the note.
 * @param content The content of the note.
 * @param section The section the note is in.
 * @returns The created note.
 */
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

/**
 * Finds notes in the database.
 * 
 * @param filter The filter to use to find the Note(s).
 * @returns A Promise that resolves to the Note(s).
 */
async function find(filter: any): Promise<Note[]> {
  return (await collections.notes.find(filter).toArray()).map(getNote);
}

/**
 * Deletes notes from the database.
 * 
 * @param filter The filter to use to find the Note(s).
 * @returns An object that reports the number of notes that were deleted.
 */
function remove(filter: any) {
  return collections.notes.deleteMany(filter);
}

/**
 * Updates a note in the database.
 * 
 * @param note The note to update.
 * @param data The data to update the note with. Can't update the _id field.
 * @returns The updated note.
 */
async function update(note: Note, data: any): Promise<Note> {
  if ("_id" in data) {
    throw new Error("Cannot update _id");
  }
  await collections.notes.updateOne({ _id: note._id }, { $set: data });
  return note.reload();
}

export { insert, find, remove, update };

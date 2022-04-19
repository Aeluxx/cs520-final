import { ObjectId, WithId, Document } from "mongodb";

/**
 * The raw data of a note.
 */
export interface NoteData extends WithId<Document> {
  _id: ObjectId;
  title: String;
  content: String;
  sectionId: ObjectId;
}

/**
 * A more friendly representation of a note.
 * 
 * reload() will reload the note from the database.
 */
export interface Note extends NoteData {
  reload: () => Promise<Note>;
}

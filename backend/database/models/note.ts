import { ObjectId, WithId, Document } from "mongodb";

export interface NoteData extends WithId<Document> {
  _id: ObjectId;
  title: String;
  content: String;
  sectionId: ObjectId;
}

export interface Note extends NoteData {
  reload: () => Promise<Note>;
}

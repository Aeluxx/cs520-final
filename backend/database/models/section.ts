import { ObjectId, WithId, Document } from "mongodb";

/**
 * The raw data of a section.
 */
export interface SectionData extends WithId<Document> {
  _id: ObjectId;
  name: String;
  userIds: ObjectId[];
}

/**
 * A more friendly representation of a section.
 * 
 * reload() will reload the section from the database.
 */
export interface Section extends SectionData {
  reload: () => Promise<Section>;
}

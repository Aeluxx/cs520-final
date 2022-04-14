import { ObjectId, WithId, Document } from "mongodb";

export interface SectionData extends WithId<Document> {
  _id: ObjectId;
  name: String;
  userIds: ObjectId[];
}

export interface Section extends SectionData {
  reload: () => Promise<Section>;
}

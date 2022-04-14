import { ObjectId, WithId, Document } from "mongodb";

export interface UserData extends WithId<Document> {
  _id: ObjectId;
  name: String;
  email: String;
  password: String;
  sectionIds: ObjectId[];
}

export interface User extends UserData {
  reload: () => Promise<User>;
}

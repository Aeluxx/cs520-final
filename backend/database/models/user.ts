import { ObjectId, WithId, Document } from "mongodb";

/**
 * The raw data of a user.
 */
export interface UserData extends WithId<Document> {
  _id: ObjectId;
  name: String;
  email: String;
  password: String;
  sectionIds: ObjectId[];
}

/**
 * A more friendly representation of a user.
 * 
 * reload() will reload the user from the database.
 */
export interface User extends UserData {
  reload: () => Promise<User>;
}

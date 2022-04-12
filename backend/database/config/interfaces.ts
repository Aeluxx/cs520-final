import { Types } from "mongoose";

interface IUser {
  name: string;
  email: string;
  password: string;
}

interface IClass {
  name: string;
  users: Types.ObjectId;
}

interface INote {
  title: String;
  contents: String;
  class: Types.ObjectId;
}

export { IUser, IClass, INote };

import { ObjectId } from "mongodb";
import { Section } from "../models/section";
import { User, UserData } from "../models/user";
import { collections } from "../setup/setup";
import { addUserToSection, removeUserFromSection } from "./shared";

function getUser(userData: UserData): User {
  const user = userData as User;
  user.reload = async function (): Promise<User> {
    return Object.assign(this, (await find({ _id: this._id }))[0]);
  };
  return user;
}

async function insert(
  name: string,
  email: string,
  password: string,
  sections: Section[] = []
) {
  const res = await collections.users.insertOne({
    _id: new ObjectId(),
    name,
    email,
    password,
    sectionIds: [],
  });
  const user = (await find({ _id: res.insertedId }))[0];
  await Promise.all(sections.map(section => addUserToSection(user, section)));
  return user;
}

async function find(filter: any): Promise<User[]> {
  return (await collections.users.find(filter).toArray()).map(getUser);
}

function remove(filter: any) {
  return collections.users.deleteMany(filter);
}

async function update(user: User, data: any) {
  if ("_id" in data) {
    throw new Error("Cannot update _id");
  }
  await collections.users.updateOne({ _id: user._id }, { $set: data });
  return user.reload();
}

function addSection(user: User, section: Section) {
  return addUserToSection(user, section);
}

function removeSection(user: User, section: Section) {
  return removeUserFromSection(user, section);
}

export { insert, find, remove, update, addSection, removeSection };

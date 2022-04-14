import { ObjectId } from "mongodb";
import { Section, SectionData } from "../models/section";
import { User } from "../models/user";
import { collections } from "../setup/setup";
import { addUserToSection, removeUserFromSection } from "./shared";

function getSection(sectionData: SectionData): Section {
  const section = sectionData as Section;
  section.reload = async function r(): Promise<Section> {
    return Object.assign(this, (await find({ _id: this._id }))[0]);
  };
  return section;
}

async function insert(name: string, users: User[] = []) {
  const res = await collections.sections.insertOne({
    _id: new ObjectId(),
    name,
    userIds: [],
  });
  const section = (await find({ _id: res.insertedId }))[0];
  await Promise.all(users.map(user => addUserToSection(user, section)));
  return section;
}

async function find(filter: any): Promise<Section[]> {
  return (await collections.sections.find(filter).toArray()).map(getSection);
}

function remove(filter: any) {
  return collections.sections.deleteMany(filter);
}

async function update(section: Section, data: any) {
  if ("_id" in data) {
    throw new Error("Cannot update _id");
  }
  await collections.sections.updateOne({ _id: section._id }, { $set: data });
  return section.reload();
}

async function addUser(section: Section, user: User) {
  await addUserToSection(user, section);
}

async function removeUser(section: Section, user: User) {
  await removeUserFromSection(user, section);
}

export { insert, find, remove, update, removeUser, addUser };

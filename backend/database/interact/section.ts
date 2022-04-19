import { ObjectId } from "mongodb";
import { Section, SectionData } from "../models/section";
import { User } from "../models/user";
import { collections } from "../setup/setup";
import { addUserToSection, removeUserFromSection } from "./shared";

/**
 * Converts a SectionData object to a Section object.
 * 
 * @param sectionData The data to create the section with
 * @returns A Section object with the data
 */
function getSection(sectionData: SectionData): Section {
  const section = sectionData as Section;
  section.reload = async function r(): Promise<Section> {
    return Object.assign(this, (await find({ _id: this._id }))[0]);
  };
  return section;
}

/**
 * Inserts a section into the database.
 * 
 * @param name The name of the section.
 * @param users Optional: The users to add to the section.
 * @returns The created section.
 */
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

/**
 * Finds sections in the database.
 * 
 * @param filter The filter to use to find the Section(s).
 * @returns A Promise that resolves to the Section(s).
 */
async function find(filter: any): Promise<Section[]> {
  return (await collections.sections.find(filter).toArray()).map(getSection);
}

/**
 * Deletes sections from the database.
 * 
 * @param filter The filter to use to find the Section(s).
 * @returns An object that reports the number of sections that were deleted.
 */
function remove(filter: any) {
  return collections.sections.deleteMany(filter);
}

/**
 * Updates a section in the database.
 * 
 * @param section The section to update
 * @param data The data to update the section with. Can't update the _id field.
 * @returns The updated section
 */
async function update(section: Section, data: any) {
  if ("_id" in data) {
    throw new Error("Cannot update _id");
  }
  await collections.sections.updateOne({ _id: section._id }, { $set: data });
  return section.reload();
}

/**
 * Adds a user to a section and vice versa.
 * 
 * @param section The section to add the user to
 * @param user The user to add to the section
 */
async function addUser(section: Section, user: User) {
  await addUserToSection(user, section);
}

/**
 * Removes a user from a section and vice versa.
 * 
 * @param section The section to remove the user from
 * @param user The user to remove from the section
 */
async function removeUser(section: Section, user: User) {
  await removeUserFromSection(user, section);
}

export { insert, find, remove, update, removeUser, addUser };

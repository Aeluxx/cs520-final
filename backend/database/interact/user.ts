import { ObjectId } from "mongodb";
import { Section } from "../models/section";
import { User, UserData } from "../models/user";
import { collections } from "../setup/setup";
import { addUserToSection, removeUserFromSection } from "./shared";

/**
 * Converts a UserData object to a User object.
 * 
 * @param userData The data to create the user with
 * @returns A User object with the data
 */
function getUser(userData: UserData): User {
  const user = userData as User;
  user.reload = async function (): Promise<User> {
    return Object.assign(this, (await find({ _id: this._id }))[0]);
  };
  return user;
}

/**
 * Inserts a user into the database.
 * 
 * @param name The name of the user.
 * @param email The email of the user.
 * @param password The password of the user.
 * @param sections Optional: The sections to add the user to.
 * @returns The created user.
 */
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

/**
 * Finds users in the database.
 * 
 * @param filter The filter to use to find the User(s).
 * @returns A Promise that resolves to the User(s).
 */
async function find(filter: any): Promise<User[]> {
  return (await collections.users.find(filter).toArray()).map(getUser);
}

/**
 * Deletes users from the database.
 * 
 * @param filter The filter to use to find the User(s).
 * @returns An object that reports the number of users that were deleted.
 */
function remove(filter: any) {
  return collections.users.deleteMany(filter);
}

/**
 * Updates a user in the database.
 * 
 * @param user The user to update
 * @param data The data to update the user with. Can't update the _id field.
 * @returns The updated user
 */
async function update(user: User, data: any) {
  if ("_id" in data) {
    throw new Error("Cannot update _id");
  }
  await collections.users.updateOne({ _id: user._id }, { $set: data });
  return user.reload();
}

/**
 * Adds a user to a section.
 * 
 * @param user The user to add the section to.
 * @param section The section to add the user to.
 * @returns The updated user.
 */
function addSection(user: User, section: Section) {
  return addUserToSection(user, section);
}

/**
 * Removes a user from a section.
 * 
 * @param user The user to remove the section from.
 * @param section The section to remove the user from.
 * @returns The updated user.
 */
function removeSection(user: User, section: Section) {
  return removeUserFromSection(user, section);
}

export { insert, find, remove, update, addSection, removeSection };

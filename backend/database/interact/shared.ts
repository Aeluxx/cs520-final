import { Section } from "../models/section";
import { User } from "../models/user";
import { collections } from "../setup/setup";

/**
 * Adds a user to a section and the section to the user. Then updates the user and section.
 * 
 * @param user The user to add to the section.
 * @param section The section to add the user to.
 */
async function addUserToSection(user: User, section: Section) {
  await collections.users.updateOne(
    { _id: user._id },
    { $push: { sectionIds: section._id } }
  );
  await collections.sections.updateOne(
    { _id: section._id },
    { $push: { userIds: user._id } }
  );
  await user.reload();
  await section.reload();
}

/**
 * Removes a user from a section and the section from the user. Then updates the user and section.
 * 
 * @param user The user to remove from the section.
 * @param section The section to remove the user from.
 */
async function removeUserFromSection(user: User, section: Section) {
  await collections.users.updateOne(
    { _id: user._id },
    { $pull: { sectionIds: section._id } }
  );
  await collections.sections.updateOne(
    { _id: section._id },
    { $pull: { userIds: user._id } }
  );
  await user.reload();
  await section.reload();
}

export { addUserToSection, removeUserFromSection };

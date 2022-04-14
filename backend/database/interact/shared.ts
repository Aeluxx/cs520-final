import { Section } from "../models/section";
import { User } from "../models/user";
import { collections } from "../setup/setup";

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

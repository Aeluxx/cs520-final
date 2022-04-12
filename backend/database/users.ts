import { IUser } from "./config/interfaces";
import { models } from "./config/setup";

async function insert(
  name: string,
  email: string,
  password: string
): Promise<IUser> {
  const user = await new (await models).Users({ name, email, password });
  return await user.save();
}

async function find(filterObject: any): Promise<IUser[]> {
  return await (await models).Users.find(filterObject);
}

async function remove(email: string) {
  return await (await models).Users.deleteMany({ email });
}

export { insert, find, remove };

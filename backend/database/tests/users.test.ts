import { insert, find, remove } from "./../users";
import { disconnect } from "../config/setup";

describe("Users Database Interaction Tests", () => {
  test("Insert, Find, and Remove Test", async () => {
    await remove("testEmail");
    expect(await find({ email: "testEmail" })).toHaveLength(0);
    await Promise.all([
      insert("name1", "testEmail", "pass1"),
      insert("name2", "testEmail", "pass2"),
      insert("name3", "testEmail", "pass3"),
    ]);
    const added = await find({ email: "testEmail" });
    expect(added.length).toBe(3);
    const notFound = new Set(["name1", "name2", "name3"]);
    for (const user of added) {
      notFound.delete(user.name);
      const fromDB = await find({ name: user.name, email: "testEmail" });
      expect(fromDB[0].password).toBe(`pass${fromDB[0].name.split("name")[1]}`);
    }
    expect(notFound.size).toBe(0);
  });
  afterAll(disconnect);
});

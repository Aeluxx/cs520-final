import { test, expect, describe, beforeAll, afterAll } from "@jest/globals";
import { connect, Notes, Users, Sections, disconnect } from "../interact";

describe("Database Mongoose Integration Tests", () => {
  beforeAll(async () => {
    await connect();
    // Clear Test DB at beginning
    await Users.remove({});
    await Sections.remove({});
    await Notes.remove({});
  });

  test("Connect to DB", async () => {
    expect(true).toBe(true);
  });

  test("Create, Find, Remove Users", async () => {
    await Users.insert("bbb", "ggg", "hhh");
    const found = await Users.find({ name: "bbb" });
    expect(found).toHaveLength(1);
    const user = found[0];
    expect(user.name).toBe("bbb");
    expect(user.email).toBe("ggg");
    expect(user.password).toBe("hhh");
    expect(user.sectionIds).toHaveLength(0);
    await Users.remove({ name: "bbb" });
    expect(await Users.find({ name: "bbb" })).toHaveLength(0);
  });

  test("Create, Find, Remove Sections", async () => {
    await Sections.insert("class1");
    const found = await Sections.find({ name: "class1" });
    expect(found).toHaveLength(1);
    const user = found[0];
    expect(user.name).toBe("class1");
    expect(user.userIds).toHaveLength(0);
    await Sections.remove({ name: "class1" });
    expect(await Sections.find({ name: "class1" })).toHaveLength(0);
  });

  test("Add User to Section", async () => {
    let bob = await Users.insert("bob", "bob@gmail.com", "bobPass");
    const bob_class = await Sections.insert("bob_class", [bob]);
    expect(bob_class.userIds).toHaveLength(1);
    expect(bob_class.userIds[0]).toEqual(bob._id);
    expect(bob.sectionIds).toHaveLength(1);
    expect(bob.sectionIds[0]).toEqual(bob_class._id);
  });

  test("CRUD Sections", async () => {
    const bob = await Users.insert("bob", "bob@gmail.com", "bobPass");
    const class1 = await Sections.insert("class1");
    expect(class1.userIds).toHaveLength(0);
    expect(class1.name).toBe("class1");
    await Sections.addUser(class1, bob);
    expect(class1.userIds).toHaveLength(1);
    expect(class1.userIds[0]).toEqual(bob._id);
    await Sections.removeUser(class1, bob);
    expect(class1.userIds).toHaveLength(0);
    await Sections.update(class1, { name: "class2" });
    expect(class1.name).toBe("class2");
    await Sections.remove({ name: "class2" });
    expect(await Sections.find({ name: "class2" })).toHaveLength(0);
  });

  test("CRUD Notes", async () => {
    const section = await Sections.insert("section1");
    const note = await Notes.insert("note1", "content1", section);
    expect(note.title).toBe("note1");
    expect(note.content).toBe("content1");
    expect(note.sectionId).toEqual(section._id);
    const found = await Notes.find({ _id: note._id });
    expect(found).toHaveLength(1);
    const note_found = found[0];
    expect(note_found.title).toBe("note1");
    expect(note_found.content).toBe("content1");
    expect(note_found.sectionId).toEqual(section._id);
    const updated = await Notes.update(note, {
      title: "note2",
      content: "content2",
    });
    expect(updated.title).toBe("note2");
    expect(updated.content).toBe("content2");
    expect(updated.sectionId).toEqual(section._id);
    await Notes.remove({ _id: note._id });
    expect(await Notes.find({ _id: note._id })).toHaveLength(0);
  });

  afterAll(disconnect);
});

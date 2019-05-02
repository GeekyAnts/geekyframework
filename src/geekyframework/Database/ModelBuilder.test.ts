import ModelBuilder from "./ModelBuilder";
import Model from "./Model";
import FakeConnection from "./Connection/FakeConnection";
import Builder from "./Builder";
let connection = new FakeConnection();

class User extends Model {
  static entity = "user";
  protected static fillable = ["name"];
  protected static hidden = ["password"];
}

test("Insert", async () => {
  const builderObj = new Builder(connection);

  const builder = new ModelBuilder(User, builderObj);

  var user = await builder.insert({ name: "suraj" });
  expect(user.name).toBe("suraj");

  //   console.log(data, "data here");
  // console.log(builder.where("id", "=", 5).first());
});

test("Query", async () => {
  const builderObj = new Builder(connection);

  const builder = new ModelBuilder(User, builderObj);
  const user = await builder.where("name", "=", "suraj").query();

  //   console.log(user);
  // var user = await builder.insert({ name: "suraj" });
  // expect(builder.where("name", "=", "suraj")).toBe("suraj");

  //   console.log(data, "data here");
  // console.log(builder.where("id", "=", 5).first());
});

test("update", async () => {
  const builderObj = new Builder(connection);

  const builder = new ModelBuilder(User, builderObj);
  const user = await builder.update({ name: "Sanket", id: 5 });

  expect(user.name).toBe("Sanket");
  expect(user.id).toBe(5);
});

test("Delete", async () => {
  const builderObj = new Builder(connection);

  const builder = new ModelBuilder(User, builderObj);
  //   var user = await builder.insert({ name: "suraj" });

  //   await builder.where("name", "=delete();
  //   console.log(user.name);

  //   const user = await builder.delete();

  //   expect(user.name).toBe("Sanket");
});

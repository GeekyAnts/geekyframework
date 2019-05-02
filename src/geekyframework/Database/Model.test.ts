import Model from "./Model";
import { isObservable } from "mobx";

import FakeConnection from "./Connection/FakeConnection";
let connection = new FakeConnection();

class User extends Model {
  static entity = "user";
  protected static fillable = ["name"];
  protected static hidden = ["password"];
}

test("Basic set and get", () => {
  var user = new User();
  user.setConnection(connection);
  // console.log("entitys", User.fillable);
  user.name = "Sanket";

  // console.log(user.name, user.where(), "fillable");
  // user.password = "Sanket";
  // console.log("ZZZZZ", user.where("id", "=", 2));

  expect(user.name).toBe("Sanket");
});

test("Basic save", async () => {
  var user = new User();
  user.setConnection(connection);

  user.name = "Sanket";
  const userObj = await user.save();

  console.log(userObj.name, "hello userObj");
  // console.log(user.name, user.where(), "fillable");
  // user.password = "Sanket";
  // console.log("ZZZZZ", user.where("id", "=", 2));

  // expect(user.name).toBe("Sanket");
});

test("Model.findById", async () => {
  // var user = await User.findById("5");
  // console.log(user, "heelo here");
  // expect(user.id).toBe(5);
});

test("Model: Save Interceptor", async () => {});

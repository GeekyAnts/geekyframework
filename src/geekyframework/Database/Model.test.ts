import Model from "./Model";

class User extends Model {
  static entity = "user";
  protected static fillable = ["name"];
  protected static hidden = ["password"];
}

// test("Basic set and get", () => {
//   var user = new User();
//   user.name = "Sanket";
//   expect(user.name).toBe("Sanket");
// });

// test("Model.findById", async () => {
//   var user = await User.findById("5");
//   expect(user.id).toBe(5);
// });

test("Model: Save Interceptor", async () => {});

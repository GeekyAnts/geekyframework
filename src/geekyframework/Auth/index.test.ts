import Auth from "./index";
import Authenticatable from "./Authenticatable";
class User extends Authenticatable {
  static fillable = ["name"];
  entity = "user";
}
const auth = new Auth();
test("Login User", () => {
  var user = new User();
  user.name = "Rishab";
  user.email = "rishab@gmail.com";
  user.password = "hello";
  auth.login(user);
  expect(auth.user()).toBeDefined();
  expect(auth.user()!.name).toBe("Rishab");
});

test("Logout User", () => {
  auth.logout();
  expect(auth.user()).toBeUndefined();
});

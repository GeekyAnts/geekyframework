/*import ModelMST from "./ModelMST";
import { types } from "mobx-state-tree";

const User = ModelMST.named("User")
  .props({
    name: types.string
  })
  .actions(self => {
    return {
      setName(newName: string) {
        self.name = newName;
      }
    };
  });*/

test("Model set and get", () => {
  /*  let user = User.create({ name: "Sanket" });
  user.setName("asd");
  expect(user.name).toBe("asd");*/
});

/*test("Model.findById", async () => {
  let foundUser = await User.findById(1);
  expect(foundUser.id).toBe(1);
});
*/

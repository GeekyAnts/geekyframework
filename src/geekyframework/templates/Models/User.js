import { types } from "mobx-state-tree";

const User = types
  .model({
    name: types.string
  })
  .actions(self => {
    return {
      setName(name) {
        self.name = name;
      }
    };
  });

export default User;

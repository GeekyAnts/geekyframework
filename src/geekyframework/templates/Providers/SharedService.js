import UserModel from "../Models/User";

export default function() {
  const shared = {
    user: UserModel.create({ name: "John Doe" })
  };

  this.set("shared", shared);
}

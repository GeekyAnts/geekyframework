import Container from "./index";

test("Container: Basic set and get test", () => {
  var container = new Container();
  container.bind("name", "John Doe");
  expect(container.make("name")).toBe("John Doe");
});

test("Container: Basic instantiation", () => {
  class User {
    name: string;
    constructor(name: string) {
      this.name = name;
    }
  }

  var container = new Container();
  container.bindClass("User", User);

  var user = container.make("User", ["John Doe"]);
  expect(user.name).toBe("John Doe");
});

test("Container: Singleton", () => {
  class User {
    name: string;
    constructor(name: string) {
      this.name = name;
    }
  }

  var container = new Container();
  container.singleton("User", User);

  var user = container.make("User", ["First"]);
  var anotherUser = container.make("User", ["Second"]);
  expect(anotherUser.name).toBe("First");
});

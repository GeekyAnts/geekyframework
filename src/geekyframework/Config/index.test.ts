import Config from "./index";

test("Config: Basic set and get test", () => {
  var config = new Config();
  config.set("name", "GeekyAnts");
  expect(config.get("name")).toBe("GeekyAnts");
});

test("Config: Set many and get", () => {
  var config = new Config({
    name: "GeekyAnts",
    version: "1.0"
  });

  expect(config.get("name")).toBe("GeekyAnts");
  expect(config.get("version")).toBe("1.0");
});

test("Config: getMany", () => {
  var config = new Config({
    name: "GeekyAnts",
    version: "1.0"
  });

  var got = config.get(["name", "version"]);

  expect(got.name).toBe("GeekyAnts");
  expect(got.version).toBe("1.0");
});

import Builder from "./Builder";
import FakeConnection from "./Connection/FakeConnection";

let connection = new FakeConnection();
let builder = new Builder(connection);

test("Builder: Test where() and query()", async () => {
  let fetchedValues: any = await builder
    .select("*")
    .from("user")
    .where("name", "=", "Sanket")
    .query();

  expect(fetchedValues[0].hasOwnProperty("id")).toBe(true);
});

test("Builder: Test insert()", async () => {
  let insertedValues: any = await builder.from("user").insert({
    name: "Sanket"
  });
  expect(insertedValues.hasOwnProperty("id")).toBe(true);
});

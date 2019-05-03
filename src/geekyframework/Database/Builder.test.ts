import Builder from "./Builder";
import FakeConnection from "./Connection/FakeConnection";
import FirebaseConnection from "./Connection/FirebaseConnection";

// let connection = new FakeConnection();
let firebaseConnection = new FirebaseConnection({
  apiKey: "AIzaSyCnRxZIHrZQ9JyXxkp8bR9oPWsI84kNnVg",
  authDomain: "geekyframework.firebaseapp.com",
  databaseURL: "https://geekyframework.firebaseio.com",
  projectId: "geekyframework",
  storageBucket: "geekyframework.appspot.com",
  messagingSenderId: "1028118111860"
});
let builder = new Builder(firebaseConnection);

test("Builder: Test insert()", async () => {
  let id: any = await builder.from("user").insert({
    name: "Ankur"
  });
  expect(id["name"]).toBe("Ankur");
});
test("Builder: Test insert()", async () => {
  let insertName = "SurajSSS";
  let id: any = await builder.from("user").insert({
    name: insertName
  });
  expect(id["name"]).toBe(insertName);
});
test("Builder: Test where() and query()", async () => {
  let fetchedValues: any = await builder
    .select("*")
    .from("user")
    .where("name", "=", "Ankur")
    .query();
  expect(fetchedValues[0]["name"]).toBe("Ankur");
});
test("Builder: Test delete()", async () => {
  let insertName = "SurajSSS";
  let id: any = await builder
    .from("user")
    .where("name", "=", insertName)
    .delete();
  expect(id["name"]).toBe(insertName);
});
test("Builder: Test update()", async () => {
  let updatedName = "SurajSSS";
  let id: any = await builder
    .from("user")
    .where("name", "=", "SurajSSS")
    .update({ name: updatedName });
  expect(id["name"]).toBe(updatedName);
});

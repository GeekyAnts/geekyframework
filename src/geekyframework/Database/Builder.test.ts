import Builder from "./Builder";
import FakeConnection from "./Connection/FakeConnection";
import FirestoreConnection from "./Connection/Firestore";

// let connection = new FakeConnection();
let firebaseConnection = new FirestoreConnection();
let builder = new Builder(firebaseConnection);

test("Builder: Test insert()", async () => {
  let id: any = await builder.from("user").insert({
    name: "Suraj"
  });
  expect(id).toBeDefined();
});
// test("Builder: Test where() and query()", async () => {
//   let fetchedValues: any = await builder
//     .select("*")
//     .from("user")
//     .where("name", "=", "Suraj")
//     .query();

//   expect(fetchedValues[0]["name"]).toBe("Suraj");
// });
// test("Builder: Test delete()", async () => {
//   let id: any = await builder
//     .from("user")
//     .where("name", "=", "Suraj")
//     .delete();
//   expect(true).toBe(true);
// });
// test("Builder: Test update()", async () => {
//   let id: any = await builder
//     .from("user")
//     .where("name", "=", "Suraj")
//     .update({name: "Suresh"});
//   expect(true).toBe(true);
// });

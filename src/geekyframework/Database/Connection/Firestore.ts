import ConnectionInterface from "./ConnectionInterface";
import * as Firebase from "firebase";

function getNewEntity() {
  return {
    id: Math.random(),
    name: "Geekyframework " + Math.random()
  };
}

function getNewEntityArray() {
  return [getNewEntity(), getNewEntity()];
}
const firebaseConfig = {
  apiKey: "AIzaSyCnRxZIHrZQ9JyXxkp8bR9oPWsI84kNnVg",
  authDomain: "geekyframework.firebaseapp.com",
  databaseURL: "https://geekyframework.firebaseio.com",
  projectId: "geekyframework",
  storageBucket: "geekyframework.appspot.com",
  messagingSenderId: "1028118111860"
};
export default class FirestoreConnection implements ConnectionInterface {
  database: any;
  constructor() {
    Firebase.initializeApp(firebaseConfig);
    this.database = Firebase.firestore();
  }

  async insert(entity: any, values: any) {
    return new Promise((resolve, reject) => {
      this.database
        .collection(entity)
        .add(values)
        .then((docRef: any) => {
          resolve(docRef.id);
        })
        .catch((error: any) => {
          console.log("error", error);
          reject(error);
        });
    });
  }

  // TODO: add typing for where
  async query(entity: any, select: any, where: any) {
    return new Promise((resolve, reject) => {
      let interimData = this.database.collection(entity);
      where.forEach((clause: any) => {
        interimData = interimData.where(
          clause.prop,
          clause.op === "=" ? "==" : clause.op,
          clause.val
        );
      });
      interimData
        .get()
        .then((querySnapshot: Firebase.firestore.QuerySnapshot) => {
          let outputData: Array<any> = [];
          querySnapshot.forEach(
            (snap: Firebase.firestore.QueryDocumentSnapshot) => {
              outputData.push(snap.data());
            }
          );
          resolve(outputData);
        })
        .catch((error: any) => {
          console.log("error", error);
          reject(error);
        });
    });
  }

  async update(entity: any, values: any, where: any) {
    return new Promise((resolve, reject) => {
      let interimData = this.database.collection(entity);
      where.forEach((clause: any) => {
        interimData = interimData.where(
          clause.prop,
          clause.op === "=" ? "==" : clause.op,
          clause.val
        );
      });
      interimData
        .get()
        .then((querySnapshot: Firebase.firestore.QuerySnapshot) => {
          querySnapshot.forEach(
            (doc: Firebase.firestore.QueryDocumentSnapshot) => {
              this.database
                .collection(entity)
                .doc(doc.id)
                .update()
                .then((resp: any) => {
                  resolve(true);
                })
                .catch((error: any) => {
                  reject(error);
                });
            }
          );
        })
        .catch((error: any) => {
          console.log("error", error);
          reject(error);
        });
    });
  }

  async delete(entity: any, where: any) {
    return new Promise((resolve, reject) => {
      let interimData = this.database.collection(entity);
      where.forEach((clause: any) => {
        interimData = interimData.where(
          clause.prop,
          clause.op === "=" ? "==" : clause.op,
          clause.val
        );
      });
      interimData
        .get()
        .then((querySnapshot: Firebase.firestore.QuerySnapshot) => {
          querySnapshot.forEach(
            (doc: Firebase.firestore.QueryDocumentSnapshot) => {
              this.database
                .collection(entity)
                .doc(doc.id)
                .delete()
                .then((resp: any) => {
                  resolve(true);
                })
                .catch((error: any) => {
                  reject(error);
                });
            }
          );
        })
        .catch((error: any) => {
          console.log("error", error);
          reject(error);
        });
    });
  }
}

import AuthDriverInterface from "./AuthDriverInterface";
import Authenticatable from "./Authenticatable";
import * as Firebase from "firebase";
export default class FirebaseDriver implements AuthDriverInterface {
  login(user: Authenticatable) {
    if (Firebase.apps.length > 0) {
      const app = Firebase.apps[0];
      const credentials = this.credentials(user);

      app
        .auth()
        .signInWithEmailAndPassword(credentials[0], credentials[1])
        .then(() => {
          console.log("user logged in");
        });
    }
  }
  // createUser(user: Authenticatable) {
  //   if (Firebase.apps.length > 0) {
  //     const app = Firebase.apps[0];
  //     const credentials = this.credentials(user);

  //     app
  //       .auth()
  //       .createUserWithEmailAndPassword(credentials[0], credentials[1])
  //       .then(() => {
  //         console.log("user created");
  //       });
  //   }
  // }
  logout() {
    if (Firebase.apps.length > 0) {
      const app = Firebase.apps[0];
      app
        .auth()
        .signOut()
        .then(() => {
          console.log("user signout ");
        });
    }
  }
  validateLogin(user: Authenticatable) {
    return this.username(user) && user.getAuthPassword() ? true : false;
  }
  attemptLogin(user: Authenticatable) {
    const credentials = this.credentials(user);
    return credentials ? true : false;
  }
  credentials(user: Authenticatable) {
    return [user.email, user.getAuthPassword()];
  }
  sendLoginResponse() {
    //
  }
  authenticated() {
    //
  }
  sendFailedLoginResponse(user: Authenticatable) {
    return new Error("Login Failed");
  }
  username(user: Authenticatable) {
    if (user) {
      return user.name;
    } else {
      throw new Error("User not authorized");
    }
  }
  loggedOut() {
    //
  }
}

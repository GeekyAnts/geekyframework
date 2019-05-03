import AuthDriverInterface from "./AuthDriverInterface";
import Authenticatable from "./Authenticatable";

export default class FakeDriver implements AuthDriverInterface {
  login(user: Authenticatable) {
    if (this.validateLogin(user)) {
      console.log(`${user.name} logged in`);
    } else {
      console.log("Unable to login");
    }
  }
  logout() {
    console.log("User logged out");
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

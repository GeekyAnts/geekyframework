import Authenticatable from "./Authenticatable";
import FakeDriver from "./FakeDriver";
import AuthDriverInterface from "./AuthDriverInterface";

export default class Auth {
  private _user: Authenticatable | undefined;
  private _driver: AuthDriverInterface | undefined;

  constructor() {
    this._driver = new FakeDriver();
  }
  user() {
    return this._user;
  }
  id() {}

  login(user: Authenticatable, remember: boolean = false) {
    if (!this._driver) {
      throw new Error("Connection is not intialized");
    }
    this._user = user;
    this._driver.login(this._user);
  }
  loginUsingId(userId: number, remember: boolean = false) {
    //
  }
  setAuthDriver(driver: FakeDriver) {
    this._driver = driver;
  }
  gaurd() {}
  check() {}
  logout() {
    if (!this._driver) {
      throw new Error("Connection is not intialized");
    }
    this._user = undefined;
    this._driver.logout();
  }
  /**
   * Get the login username to be used by the controller.
   *
   * @return string
   */
  username() {
    if (!this._user) {
      throw new Error("User is not defined");
    }
    return this._user.name;
  }
}

import Authenticatable from "./Authenticatable";

export default class Auth {
  private _user: Authenticatable | undefined;

  user() {
    return this._user;
  }
  id() {}
  login(user: Authenticatable, remember: boolean = false) {
    this._user = user;
  }
  gaurd() {}
  check() {}
  logout() {
    this._user = undefined;
  }
}

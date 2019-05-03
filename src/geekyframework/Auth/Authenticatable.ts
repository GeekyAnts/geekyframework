import Model from "../Database/Model";
import { isEmpty } from "lodash";
export default abstract class Authenticatable extends Model
  implements AuthenticatableInterface {
  protected rememberTokenName = "remember_token";
  getAuthIdentifierName() {
    return this.getKeyName();
  }
  getAuthIdentifier() {
    return this.getAuthIdentifierName();
  }
  getAuthPassword() {
    return this.password;
  }
  getRememberToken() {
    if (!isEmpty(this.getRememberTokenName())) {
      return this.getRememberTokenName();
    }
    return "";
  }
  setRememberToken(value: string) {
    if (!isEmpty(this.getRememberTokenName())) {
      this.rememberTokenName = value;
    }
  }
  getRememberTokenName() {
    return this.rememberTokenName;
  }
}

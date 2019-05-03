import AuthenticatableInterface from "./AuthenticatableInterface";

export default interface AuthDriverInterface {
  login(user: AuthenticatableInterface): void;
  logout(): void;
  validateLogin(user: AuthenticatableInterface): boolean;
  attemptLogin(user: AuthenticatableInterface): boolean;
  credentials(user: AuthenticatableInterface): string[];
  sendLoginResponse(user: AuthenticatableInterface): any;
  authenticated(): any;
  sendFailedLoginResponse(user: AuthenticatableInterface): Error;
  username(user: AuthenticatableInterface): string;
  loggedOut(): any;
}

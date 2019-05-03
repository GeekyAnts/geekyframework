export default interface AuthenticatableInterface {
  /**
   * Get the name of the unique identifier for the user.
   *
   * @return string
   */
  getAuthIdentifierName(): string;

  /**
   * Get the unique identifier for the user.
   *
   * @return mixed
   */
  getAuthIdentifier(): number | string;

  /**
   * Get the password for the user.
   *
   * @return string
   */
  getAuthPassword(): string;

  /**
   * Get the token value for the "remember me" session.
   *
   * @return string
   */
  getRememberToken(): string;

  /**
   * Set the token value for the "remember me" session.
   *
   * @param  string  $value
   * @return void
   */
  setRememberToken(value: string): void;

  /**
   * Get the column name for the "remember me" token.
   *
   * @return string
   */
  getRememberTokenName(): string;
}

import * as _ from "lodash";

export default class Config {
  /**
   * All of the configuration items.
   *
   * @var object
   */
  protected items = {};

  /**
   * Create a new configuration repository.
   *
   * @param  array  $items
   * @return void
   */
  constructor(items = {}) {
    this.items = items;
  }

  /**
   * Determine if the given configuration value exists.
   *
   * @param  string  key
   * @return bool
   */
  has(key: string) {
    return this.items.hasOwnProperty(key);
  }

  /**
   * Get the specified configuration value.
   *
   * @param  array|string  key
   * @param  mixed   defaultValue
   * @return mixed
   */
  get(key: string | Array<string>, defaultValue = undefined) {
    if (_.isArray(key)) {
      return this.getMany(key);
    }

    return _.get(this.items, key, defaultValue);
  }

  /**
   * Get many configuration values.
   *
   * @param  array  keys
   * @return array
   */
  getMany(keys: any) {
    var config: any = {};
    _.forEach(keys, (defaultValue, key) => {
      if (_.isNumber(key)) {
        [key, defaultValue] = [defaultValue, undefined];
      }

      config[key] = _.get(this.items, key, defaultValue);
    });

    return config;
  }

  /**
   * Set a given configuration value.
   *
   * @param  array|string  key
   * @param  mixed   value
   * @return void
   */
  set(key: string | object, value: undefined | string = undefined) {
    var keys: any = _.isObject(key) ? key : { [key]: value };

    _.forEach(keys, (value, key) => {
      _.set(this.items, key, value);
    });
  }
  /**
   * Prepend a value onto an array configuration value.
   *
   * @param  string  key
   * @param  mixed  value
   * @return void
   */
  prepend(key: string, value: any) {
    throw new Error("Prepend isn't implemented yet");
    /*values = this.get(key);

    array_unshift($array, value);

    this.set(key, $array);*/
  }

  /**
   * Push a value onto an array configuration value.
   *
   * @param  string  key
   * @param  mixed  value
   * @return void
   */
  push(key: string, value: any) {
    var obj = this.get(key);
    obj[key] = value;
    this.set(key, obj);
  }

  /**
   * Get all of the configuration items for the application.
   *
   * @return array
   */
  all() {
    return this.items;
  }

  /**
   * Determine if the given configuration option exists.
   *
   * @param  string  key
   * @return bool
   */
  offsetExists(key: string) {
    return this.has(key);
  }

  /**
   * Get a configuration option.
   *
   * @param  string  key
   * @return mixed
   */
  offsetGet(key: string) {
    return this.get(key);
  }

  /**
   * Set a configuration option.
   *
   * @param  string  key
   * @param  mixed  value
   * @return void
   */
  offsetSet(key: string, value: any) {
    this.set(key, value);
  }

  /**
   * Unset a configuration option.
   *
   * @param  string  key
   * @return void
   */
  offsetUnset(key: string) {
    this.set(key, undefined);
  }
}

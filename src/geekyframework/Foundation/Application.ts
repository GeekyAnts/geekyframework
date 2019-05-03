import Container from "../Container";
import Config from "../Config";
import * as _ from "lodash";
import ServiceProvider from "../Support/ServiceProvider";
import { Provider } from "mobx-react";
import Auth from "../Auth";
import FakeDriver from "../Auth/FakeDriver";
import FirebaseDriver from "../Auth/FirebaseDriver";

export default class Application extends Container {
  readonly VERSION = "0.0.1";

  protected _hasBeenBootstrapped: boolean = false;
  protected _booted: boolean = false;
  protected bootingCallbacks: Array<() => {}> = [];
  protected bootedCallbacks: Array<() => {}> = [];
  protected terminatingCallbacks: Array<() => {}> = [];
  protected serviceProviders: Array<ServiceProvider> = [];
  protected loadedProviders: Array<ServiceProvider> = [];

  static instances: Array<Application> = [];

  protected appPath: string = "";

  constructor() {
    super();
    this.registerBaseBindings();
    this.registerBaseServiceProviders();
    this.registerCoreContainerAliases();
    Application.instances.push(this);
  }

  registerBaseBindings() {}

  registerBaseServiceProviders() {}

  /**
   * Register all of the configured providers.
   *
   * @return void
   */
  registerConfiguredProviders() {
    var Providers = this.get("config").get("app.providers");
    _.forEach(Providers, Provider => {
      this.register(new Provider(this));
    });
  }

  /**
   * Register a service provider with the application.
   *
   * @param  \Illuminate\Support\ServiceProvider|string  provider
   * @param  bool   force
   * @return \Illuminate\Support\ServiceProvider
   */
  register(provider: ServiceProvider) {
    if (this.getProvider(provider)) {
      return true;
    }
    console.log(provider);

    // If the given "provider" is a string, we will resolve it, passing in the
    // application instance automatically for the developer. This is simply
    // a more convenient way of specifying your service provider classes.
    /*if (is_string(provider)) {
      provider = this.resolveProvider(provider);
    }*/

    provider.register();

    // If there are bindings / singletons set as properties on the provider we
    // will spin through them and register them with the application, which
    // serves as a convenience layer while registering a lot of bindings.
    /*if (provider.hasOwnProperty('bindings')) {
      _.forEach(provider['bindings'], (value, key) => {
        this.bind(key, value);
      });
    }

    if (property_exists(provider, 'singletons')) {
      foreach(provider -> singletons as key => value) {
        this.singleton(key, value);
      }
    }*/

    this.markAsRegistered(provider);

    // If the application has already booted, we will call this boot method on
    // the provider class so it has an opportunity to do its boot logic and
    // will be ready for any usage by this developer's application logic.
    if (this.booted) {
      this.bootProvider(provider);
    }

    return provider;
  }

  /**
   * Mark the given provider as registered.
   *
   * @param  \Illuminate\Support\ServiceProvider  $provider
   * @return void
   */
  protected markAsRegistered(provider: ServiceProvider) {
    this.serviceProviders.push(provider);
    this.loadedProviders.push(provider);
  }

  resolveProvider(provider: { new (app: Application): ServiceProvider }) {
    return new provider(this);
  }

  /**
   * Get the registered service provider instance if it exists.
   *
   * @param  \Illuminate\Support\ServiceProvider|string  provider
   * @return \Illuminate\Support\ServiceProvider|null
   */
  getProvider(provider: ServiceProvider) {
    return _.find(this.serviceProviders, match => match === provider);
  }

  /**
   * Get the registered service provider instances if any exist.
   *
   * @param  \Illuminate\Support\ServiceProvider|string  provider
   * @return array
   */
  getProviders(provider: ServiceProvider) {
    return _.filter(this.serviceProviders, match => match === provider);
  }

  registerCoreContainerAliases() {
    _.forEach(
      {
        app: Application,
        config: Config,
        "auth.driver": FirebaseDriver,
        auth: Auth
      },
      (alias, key) => {
        this.singleton(key, alias);
      }
    );
    this.get("config").set("__framework", "Geekyframework");
  }

  boot() {
    if (this._booted) return;

    this.fireAppCallbacks(this.bootingCallbacks);

    this.serviceProviders.forEach(provider => {
      this.bootProvider(provider);
    });

    this.fireAppCallbacks(this.bootedCallbacks);

    this.registerConfiguredProviders();

    this._booted = true;
  }

  bootProvider(provider: ServiceProvider) {
    provider.boot();
  }

  protected fireAppCallbacks(callbacks: Array<() => {}>) {
    callbacks.forEach(callback => {
      callback.call(this);
    });
  }

  /**
   * Register a new boot listener.
   *
   * @param  callable  $callback
   * @return void
   */
  public booting(callback: () => {}) {
    this.bootingCallbacks.push(callback);
  }

  /**
   * Register a new "booted" listener.
   *
   * @param  callable  $callback
   * @return void
   */
  public booted(callback: () => {}) {
    this.bootedCallbacks.push(callback);

    if (this.isBooted()) {
      this.fireAppCallbacks([callback]);
    }
  }

  /**
   * Determine if the application has booted.
   *
   * @return bool
   */
  public isBooted() {
    return this._booted;
  }

  /**
   * Get the current application locale.
   *
   * @return string
   */
  public getLocale() {
    return (this.get("config") as Config).get("app.locale");
  }

  /**
   * Set the current application locale.
   *
   * @param  string  $locale
   * @return void
   */
  public setLocale(locale: any) {
    (this.get("config") as Config).set("app.locale", locale);
  }

  /**
   * Determine if application locale is the given locale.
   *
   * @param  string  $locale
   * @return bool
   */
  public isLocale($locale: any) {
    return this.getLocale() == $locale;
  }
}

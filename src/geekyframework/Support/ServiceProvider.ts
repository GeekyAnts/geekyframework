import Application from "../Foundation/Application";

export default abstract class ServiceProvider {
  /**
   * The application instance.
   *
   * @var \Illuminate\Contracts\Foundation\Application
   */
  protected app: Application;

  /**
   * Indicates if loading of the provider is deferred.
   *
   * @deprecated Implement the \Illuminate\Contracts\Support\DeferrableProvider interface instead. Will be removed in Laravel 5.9.
   *
   * @var bool
   */
  protected defer = false;

  /**
   * Create a new service provider instance.
   *
   * @param  \Illuminate\Contracts\Foundation\Application  app
   * @return void
   */
  public constructor(app: Application) {
    this.app = app;
  }

  /**
   * Register any application services.
   *
   * @return void
   */
  public register() {
    //
  }

  /**
   * Get the services provided by the provider.
   *
   * @return array
   */
  public provides() {
    return [];
  }

  /**
   * Get the events that trigger this service provider to register.
   *
   * @return array
   */
  public when() {
    return [];
  }

  /**
   * Determine if the provider is deferred.
   *
   * @return bool
   */
  public isDeferred() {
    return this.defer;
  }

  public boot() {}
}

import * as _ from "lodash";

export default class Container {
  protected bindings: Map<
    any,
    {
      instantiable: boolean;
      singleton: boolean;
      value: any;
    }
  > = new Map();
  protected instances: Map<any, any> = new Map();
  protected aliases: Map<any, any> = new Map();

  protected dropStaleInstances(abstract: string) {
    this.instances.delete(abstract);
    this.aliases.delete(abstract);
  }

  public bind(
    abstract: any,
    concrete: any,
    instantiable = false,
    singleton = false
  ) {
    this.dropStaleInstances(abstract);

    // If no concrete type was given, we will simply set the concrete type to the
    // abstract type. After that, the concrete type to be registered as shared
    // without being forced to state their classes in both of the parameters.
    if (_.isNull(concrete)) {
      concrete = abstract;
    }

    // If the factory is not a Closure, it means it is just a class name which is
    // bound into this container to the abstract type and we will just wrap it
    // up inside its own Closure to give us more convenience when extending.
    //if (!concrete instanceof Closure) {
    //  concrete = this.getClosure(abstract, concrete);
    //}

    this.bindings.set(abstract, {
      instantiable,
      singleton,
      value: concrete
    });

    // If the abstract type was already resolved in this container we'll fire the
    // rebound listener so that any objects which have already gotten resolved
    // can have their copy of the object updated via the listener callbacks.
    //if (this.resolved(abstract)) {
    //this.rebound(abstract);
    //}
  }

  public singleton(abstract: any, concrete: any) {
    return this.bind(abstract, concrete, true, true);
  }

  public bindClass(abstract: any, concrete: any, singleton = false) {
    return this.bind(abstract, concrete, true, singleton);
  }

  public get(
    abstract: any,
    parameters: Array<any> = [] /*, raiseEvents = true*/
  ) {
    return this.make(abstract, parameters);
  }

  public make(
    abstract: any,
    parameters: Array<any> = [] /*, raiseEvents = true*/
  ) {
    var bound = this.bindings.get(abstract);

    if (!bound) return;

    if (!bound.instantiable) return bound.value;

    if (!bound.singleton) return new bound.value(...parameters);

    // Singletons
    var exists = this.instances.get(abstract);
    if (exists) return exists;
    else {
      var instance = new bound.value(...parameters);
      this.instances.set(abstract, instance);
      return instance;
    }
  }
}

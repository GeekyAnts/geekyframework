import { extendObservable, toJS } from "mobx";

import Builder from "./Builder";
import FakeConnection from "./Connection/FakeConnection";
import { User } from "../../Models";
import ModelBuilder from "./ModelBuilder";
import ConnectionInterface from "./Connection/ConnectionInterface";
// import { observer } from "mobx-react";
import FirebaseConnection from "../Database/Connection/FirebaseConnection";

const defaultConfig = require("./../../config/model").default;
export default abstract class Model {
  static entity: string | null = null;
  static connection: ConnectionInterface;
  [key: string]: any;
  static modelBuilder: ModelBuilder;
  static initialized: boolean = false;

  constructor() {
    // this.connection = new FakeConnection();
    // const builderObj = new Builder(this.connection);
    // this.modelBuilder = new ModelBuilder(Model, builderObj);

    return new Proxy(this, {
      set: function(obj, prop: any, value, receiver: any) {
        if (!obj[prop]) {
          extendObservable(obj, { [prop]: value });
        } else {
          obj[prop] = value;
        }
        return true;
      },
      get: function(obj, prop: any) {
        return obj[prop];
        /*if (typeof obj[prop] == "undefined") {
          return obj.builder[prop];
        } else {
          return obj[prop];
        }*/
      }
    });
  }

  static getModelBuilder(): ModelBuilder {
    if (this.initialized) {
      this.initialize();
    }
    return this.modelBuilder;
  }
  getModelBuilder() {
    if (!(this as any).constructor.initialized) {
      (this as any).constructor.initialize();
    }

    return (this as any).constructor.modelBuilder;
  }

  static setConnection(connection: ConnectionInterface) {
    this.connection = connection;
  }
  save() {
    const toJS = this.toJS();
    return this.getModelBuilder().insert(toJS);
  }

  static initialize() {
    if (!this.connection) {
      //

      const connectionName = defaultConfig.default;

      if (connectionName === "firebase") {
        this.connection = new FirebaseConnection(
          defaultConfig.connections[connectionName]
        );
      } else {
        throw new Error("Unable to establish connection");
      }
    }
    const builderObj = new Builder(this.connection);
    this.modelBuilder = new ModelBuilder(this, builderObj);
    this.initialized = true;
  }

  static findById(id: string) {
    return this.getModelBuilder()
      .where("id", "==", id)
      .query();
  }

  static where(first: any, operator: any, second: any) {
    return this.getModelBuilder().where(first, operator, second);
  }
  static query() {
    return this.getModelBuilder().query();
  }
  static update(values: any) {
    return this.getModelBuilder().update(values);
  }
  static insert(values: any) {
    return this.getModelBuilder().insert(values);
  }
  static delete() {
    return this.getModelBuilder().delete();
  }
  static fromJS(obj: any) {
    let instance = new (this as any)();
    instance.fill(obj);
    return instance;
  }

  static fromJSArray(array: any) {
    let newArray: any = [];
    array.forEach((obj: any) => {
      let instance = this.fromJS(obj);
      newArray.push(instance);
    });
    return newArray;
  }

  fill(obj: any) {
    for (var i in obj) {
      if (
        (this as any).constructor.fillable &&
        (this as any).constructor.fillable.indexOf(i) > -1
      ) {
        this[i] = obj[i];
      }
    }
  }

  toJS() {
    let obj: any = {};
    var fillable = (this as any).constructor["fillable"];

    fillable.forEach((prop: any) => {
      obj[prop] = toJS(this[prop]);
    });

    return obj;
    // }
  }
}

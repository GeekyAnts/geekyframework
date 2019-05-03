import { extendObservable, toJS } from "mobx";

import Builder from "./Builder";
import FakeConnection from "./Connection/FakeConnection";
import { User } from "../../Models";
import ModelBuilder from "./ModelBuilder";
import ConnectionInterface from "./Connection/ConnectionInterface";

// import { observer } from "mobx-react";
export default abstract class Model {
  static entity: string | null = null;
  connection: ConnectionInterface;
  [key: string]: any;

  constructor() {
    this.connection = new FakeConnection();
    const builderObj = new Builder(this.connection);
    this.modelBuilder = new ModelBuilder(Model, builderObj);

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

  initModelBuilder() {
    const builderObj = new Builder(this.connection);
    Model.entity = this.entity;
    this.modelBuilder = new ModelBuilder(Model, builderObj);
  }
  setConnection(connection: ConnectionInterface) {
    this.connection = connection;
    this.initModelBuilder();
  }
  save() {
    const toJS = this.toJS();
    return this.modelBuilder.insert(toJS);
  }

  static async findById(id: string) {
    // if (this.entity) {
    //   // console.log(Model.entity, this.entity, "entity ZZZ");
    //   Model.entity = this.entity;
    //   // let builder = new ModelBuilder(Model);
    //   // console.log(builder.where, "builder here");
    //   var obj = await builder.where("id", "=", id);
    //   // console.log(JSON.stringify(obj), "hello");
    //   return this.fromJS(obj);
    // } else return null;
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
        (this as any).constructor["fillable"] &&
        (this as any).constructor["fillable"].indexOf(i) > -1
      ) {
        this[i] = obj[i];
      }
    }
  }

  toJS() {
    let obj: any = {};
    for (var i in this) {
      if (
        (this as any).constructor["fillable"] &&
        (this as any).constructor["fillable"].indexOf(i) > -1
      ) {
        obj[i] = toJS(this[i]);
      }
      return obj;
    }
  }
}

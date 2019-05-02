import { extendObservable, toJS } from "mobx";

import Builder from "./Builder";
import FakeConnection from "./Connection/FakeConnection";
import { User } from "../../Models";
import ModelBuilder from "./ModelBuilder";
import ConnectionInterface from "./Connection/ConnectionInterface";

// import { observer } from "mobx-react";
export default abstract class Model {
  static entity: string | null = null;
  modelBuilder: ModelBuilder;
  connection: ConnectionInterface;
  [key: string]: any;

  constructor() {
    this.connection = new FakeConnection();
    this.initModelBuilder();
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

  initModelBuilder() {
    const builderObj = new Builder(this.connection);
    this.modelBuilder = new ModelBuilder(Model, builderObj);
  }
  setConnection(connection: ConnectionInterface) {
    this.connection = connection;
    this.initModelBuilder();
  }
  save() {
    const toJS = this.toJS();

    console.log(toJS);
    // console.log(await this.modelBuilder.insert(toJS));
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
    let instance = new this();
    instance.fill(obj);
    return instance;
  }

  static fromJSArray(array: any) {
    let newArray = [];
    array.forEach(obj => {
      let instance = this.fromJS(obj);
      newArray.push(instance);
    });
    return newArray;
  }

  fill(obj: any) {
    // console.log(this.entity, "fillable here");
    for (var i in obj) {
      this[i] = obj[i];
    }
  }

  toJS() {
    let obj = {};
    for (var i in this) {
      if (
        this.constructor.fillable &&
        this.constructor.fillable.indexOf(i) > -1
      ) {
        obj[i] = toJS(this[i]);
      }
    } // return fillable property
    return obj;
    // console.log(obj, "obj here");
  }
}

import { extendObservable } from "mobx";

import Builder from "./Builder";
import FakeConnection from "./Connection/FakeConnection";
import { User } from "../../Models";

// import { observer } from "mobx-react";
export default abstract class Model {
  static entity: string | null = null;

  [key: string]: any;

  constructor() {
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

  save() {}

  static async findById(id: string) {
    if (this.entity) {
      // console.log(Model.entity, this.entity, "entity ZZZ");
      Model.entity = this.entity;
      let builder = new ModelBuilder(Model);

      // console.log(builder.where, "builder here");
      var obj = await builder.where("id", "=", id);

      // console.log(JSON.stringify(obj), "hello");
      return this.fromJS(obj);
    } else return null;
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
}

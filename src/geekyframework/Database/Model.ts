import { extendObservable } from "mobx";

import Builder from "./Builder";
import FakeConnection from "./Connection/FakeConnection";
import { User } from "../../Models";

let connection = new FakeConnection();

// import { observer } from "mobx-react";
class ModelBuilder {
  entity: string;
  builder: Builder;
  constructor(entity: string) {
    // super(connection);
    this.entity = entity;
    this.builder = new Builder(connection);
  }
  async findById(id: string) {
    let fetchedValues: any = await this.builder
      .select("*")
      .from(this.entity)
      .where("id", "=", id)
      .query();

    console.log(JSON.stringify(fetchedValues), this.entity);

    return fetchedValues[0];
    // return new Promise((resolve, reject) => {
    //   setTimeout(() => {
    //     resolve({
    //       id: 5
    //     });
    //   }, 1000);
    // });
  }
}
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
      get: async function(obj, prop: any) {
        // console.log(obj.constructor.fillable, "obj here");

        // if (obj.constructor.fillable.indexOf(prop) === -1) {
        //   let builder = new ModelBuilder(obj.constructor.entity);
        //   var obj = await builder[prop](id);
        //   return
        // }

        console.log(typeof obj[prop], prop, "hello heres");
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
      let builder = new ModelBuilder(this.entity);
      var obj = await builder.findById(id);

      // console.log(JSON.stringify(obj), "hello");
      return this.fromJS(obj);
    } else return null;
  }

  static fromJS(obj: any) {
    //let instance = new this();
    //instance.fill(obj);
    //return instance;
  }

  fill(obj: any) {
    console.log(this.entity, "fillable here");
    for (var i in obj) {
      this[i] = obj[i];
    }
  }
}

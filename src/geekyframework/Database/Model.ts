class ModelBuilder {
  entity: string | null = null;
  constructor(entity: string | null) {
    this.entity = entity;
  }
  async findById(id: string) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          id: 5
        });
      }, 1000);
    });
  }
}

export default abstract class Model {
  static entity: string | null = null;

  [key: string]: any;

  constructor() {
    return new Proxy(this, {
      set: function(obj, prop: any, value, receiver: any) {
        obj[prop] = value;
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
      let builder = new ModelBuilder(this.entity);
      var obj = await builder.findById(id);
      return this.fromJS(obj);
    } else return null;
  }

  static fromJS(obj: any) {
    // let instance = new self();
    // instance.fill(obj);
    // return instance;
  }

  fill(obj: any) {
    for (var i in obj) {
      this[i] = obj[i];
    }
  }
}

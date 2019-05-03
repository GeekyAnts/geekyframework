import Model from "./Model";
import Builder from "./Builder";
import Result from "./ModelNetworkCall";
import ModelNetworkCall from "./ModelNetworkCall";

// var a: { new (): Model };
// var b = typeof Model;
export default class ModelBuilder {
  // ModelClass: { new (): Model };
  ModelClass: typeof Model;
  builder: Builder;
  constructor(ModelClass: typeof Model, builder: Builder) {
    this.ModelClass = ModelClass;
    this.builder = builder;
    this.builder.from((ModelClass as any).entity);
  }
  // from(entity: any) {
  //   this.builder.from(entity);
  // }
  where(first: any, operator: any, second: any) {
    this.builder.where(first, operator, second);
    return this;
  }

  async find(id: any) {
    // let js = await this.builder.find(id);
    // return this.ModelClass.fromJS(js);
  }

  async first() {
    // let js = await this.builder.first();
    // return this.ModelClass.fromJS(js);
  }

  query() {
    const obj = new ModelNetworkCall<Array<Model>>(this.ModelClass);
    obj.loading = true;
    // obj.promise = this.builder.query();

    obj.promise = this.builder
      .query()
      .then(data => {
        obj.loading = false;
        obj.data = this.ModelClass.fromJSArray(data);
      })
      .catch(Error => {
        obj.loading = false;
        obj.errors.push(Error);
      });

    return obj;
  }

  update(values: any) {
    const obj = new ModelNetworkCall<typeof Model>(this.ModelClass);
    obj.loading = true;
    obj.data = this.ModelClass.fromJS({});
    // obj.promise = this.builder.update(values);

    obj.promise = this.builder
      .update(values)
      .then(data => {
        obj.loading = false;
        obj.data = this.ModelClass.fromJS(data);
      })
      .catch(Error => {
        obj.loading = false;
        obj.errors.push(Error);
      });

    return obj;
  }

  delete() {
    const obj = new ModelNetworkCall<typeof Model>(this.ModelClass);
    obj.loading = true;
    // obj.promise = this.builder.delete();

    obj.promise = this.builder
      .delete()
      .then(data => {
        obj.loading = false;
        obj.data = this.ModelClass.fromJS(data);
      })
      .catch(Error => {
        obj.loading = false;
        obj.errors.push(Error);
      });

    return obj;

    // let js = await this.builder.delete();
    // return this.ModelClass.fromJS(js);
  }

  insert(values: any) {
    const obj = new ModelNetworkCall<typeof Model>(this.ModelClass);
    obj.loading = true;
    // obj.promise = this.builder.insert(values);

    obj.promise = this.builder
      .insert(values)
      .then(data => {
        obj.loading = false;
        obj.data = this.ModelClass.fromJS(data);
      })
      .catch(Error => {
        obj.loading = false;
        obj.errors.push(Error);
      });

    return obj;
  }
}

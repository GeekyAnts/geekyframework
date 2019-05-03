import Model from "./Model";
import Builder from "./Builder";

export default class ModelBuilder {
  // ModelClass: { new (): Model };
  ModelClass: any;
  builder: Builder;
  constructor(ModelClass: any, builder: Builder) {
    // super(connection);
    this.ModelClass = ModelClass;
    this.builder = builder;
    console.log("entity", (ModelClass as any).entity);
    this.builder.from((ModelClass as any).entity);

    // console.log(ModelClass.entity, "entity");
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

  async query() {
    let js = await this.builder.query();
    return this.ModelClass.fromJSArray(js);
  }

  async update(values: any) {
    let js = await this.builder.update(values);
    return this.ModelClass.fromJS(js);
  }

  async delete() {
    let js = await this.builder.delete();
    return this.ModelClass.fromJS(js);
  }

  async insert(values: any) {
    let js = await this.builder.insert(values);
    return this.ModelClass.fromJS(js);
  }
}

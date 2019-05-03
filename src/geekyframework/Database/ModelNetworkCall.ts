import { observable } from "mobx";
import Model from "./Model";

export default class ModelNetworkCall<T> {
  data: T;
  errors: Array<string> = new Array<string>();
  @observable loading: boolean = false;
  promise: any;
  constructor(ModelClass: typeof Model) {
    this.data = ModelClass.fromJS({});
  }
}

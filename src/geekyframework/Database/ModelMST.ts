export default {};

/*import { types } from "mobx-state-tree";

interface Condition {
  prop: string;
  operator: string;
  value: any;
}

const Builder = types.model({}).actions(untypedSelf => {
  let self = untypedSelf as Builder.Type;
  let conditions: Array<Condition> = [];

  return {
    where(prop: any, operator: any, value: any) {
      conditions.push({
        prop,
        operator,
        value
      });

      return self;
    },
    getWhere(): Array<Condition> {
      return conditions;
    },
    findById() {
      console.log(self.Type);
    }
  };
});

Builder.findById = function() {};

const Model = types
  .model({
    name: types.string
  })
  .actions(self => {
    return {
      save() {
        console.log("Save called");
      }
    };
  });

export default types.compose(
  Model,
  Builder
);
*/

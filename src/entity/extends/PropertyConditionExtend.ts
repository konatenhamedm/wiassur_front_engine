/* eslint-disabled */
import PropertyCondition from '../PropertyCondition';
import ItemProperty from '../ItemProperty';
import { helper } from '@/services/Helper';

export default class PropertyConditionExtend {

  genId = helper.generateId()

  constructor(object?: any) {
  }

  postConstruct() {
  }

  isValid() {
    const self: PropertyCondition = this as any
    return self.testingProperty instanceof ItemProperty && !helper.empty(self.value) && !helper.empty(self.operator)
  }
}

/* eslint-disabled */
import ConditionGroup from '../ConditionGroup';
import PropertyCondition from '../PropertyCondition';

export default class ConditionGroupExtend {


  constructor(object?: any) {
  }

  postConstruct() {
  }

  isValid() {
    const self: ConditionGroup = this as any
    return self.conditions.every((c:PropertyCondition)=>{
      return c.isValid()
    })
  }
}

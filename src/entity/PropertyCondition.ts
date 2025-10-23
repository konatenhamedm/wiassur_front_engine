/* eslint-disabled */
import ConditionGroup from "./ConditionGroup";
import ItemProperty from "./ItemProperty";
import PropertyConditionExtend from "@/entity/extends/PropertyConditionExtend";

export default class PropertyCondition extends PropertyConditionExtend {

public id!: number;
public conditionGroup!: ConditionGroup;
public value? = '';
public operator? = '';
public testingProperty!: ItemProperty;

  constructor (object?: any) {
      super(object)
      if(object){
       this.id= object.id;
this.conditionGroup = (object.conditionGroup instanceof ConditionGroup) ? object.conditionGroup : object.conditionGroup ? new ConditionGroup(object.conditionGroup) : object.conditionGroup;
       this.value= object.value;
       this.operator= object.operator;
this.testingProperty = (object.testingProperty instanceof ItemProperty) ? object.testingProperty : object.testingProperty ? new ItemProperty(object.testingProperty) : object.testingProperty;
      }
      this.postConstruct()
  }

}

/* eslint-disabled */
import ReasonExtend from "@/entity/extends/ReasonExtend";

export default class Reason extends ReasonExtend {

public id = '';
public label = '';
public description? = '';

  constructor (object?: any) {
      super(object)
      if(object){
       this.id= object.id;
       this.label= object.label;
       this.description= object.description;
      }
      this.postConstruct()
  }

}

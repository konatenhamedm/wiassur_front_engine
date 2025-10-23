/* eslint-disabled */
import SellAdditionalInfosExtend from "@/entity/extends/SellAdditionalInfosExtend";

export default class SellAdditionalInfos extends SellAdditionalInfosExtend {

public id?:number;
public label = '';
public value = '';
public type = 'text';

  constructor (object?: any) {
      super(object)
      if(object){
       this.id= object.id;
       this.label= object.label;
       this.value= object.value;
       this.type= object.type;
      }
      this.postConstruct()
  }

}

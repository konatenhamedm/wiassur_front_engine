/* eslint-disabled */
import SellEmailExtend from "@/entity/extends/SellEmailExtend";

export default class SellEmail extends SellEmailExtend {

public id = 0;
public email = '';

  constructor (object?: any) {
      super(object)
      if(object){
       this.id= object.id;
       this.email= object.email;
      }
      this.postConstruct()
  }

}

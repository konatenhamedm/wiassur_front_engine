/* eslint-disabled */
import SellContactExtend from "@/entity/extends/SellContactExtend";

export default class SellContact extends SellContactExtend {

public id ?:number;
public phoneNumber = '';

  constructor (object?: any) {
      super(object)
      if(object){
       this.id= object.id;
       this.phoneNumber= object.phoneNumber;
      }
      this.postConstruct()
  }

}

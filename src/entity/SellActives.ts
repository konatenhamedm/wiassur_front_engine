/* eslint-disabled */
import SellActivesExtend from "@/entity/extends/SellActivesExtend";

export default class SellActives extends SellActivesExtend {

public id = 0;
public libele = '';
public partner = '';
public survey = '';

  constructor (object?: any) {
      super(object)
      if(object){
       this.id= object.id;
       this.libele= object.libele;
       this.partner= object.partner;
       this.survey= object.survey;
      }
      this.postConstruct()
  }

}

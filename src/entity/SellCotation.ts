/* eslint-disabled */
import SellCotationExtend from "@/entity/extends/SellCotationExtend";

export default class SellCotation extends SellCotationExtend {

public id = 0;
public uuid = '';
public survey = '';
public branch = '';

  constructor (object?: any) {
      super(object)
      if(object){
       this.id= object.id;
       this.uuid= object.uuid;
       this.survey= object.survey;
       this.branch= object.branch;
      }
      this.postConstruct()
  }

}

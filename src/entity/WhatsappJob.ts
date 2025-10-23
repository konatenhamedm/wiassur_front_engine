/* eslint-disabled */
import WhatsappJobExtend from "@/entity/extends/WhatsappJobExtend";

export default class WhatsappJob extends WhatsappJobExtend {

public id!: number;
public recipients= [];

  constructor (object?: any) {
      super(object)
      if(object){
       this.id= object.id;
       this.recipients= object.recipients;
      }
      this.postConstruct()
  }

}

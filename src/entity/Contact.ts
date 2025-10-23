/* eslint-disabled */
import Prospect from "./Prospect";
import ContactExtend from "@/entity/extends/ContactExtend";

export default class Contact extends ContactExtend {

public id!: number;
public number = '';
public isValid?: boolean;
public prospect?: Prospect;

  constructor (object?: any) {
      super(object)
      if(object){
       this.id= object.id;
       this.number= object.number;
       this.isValid= object.isValid;
this.prospect = (object.prospect instanceof Prospect) ? object.prospect : new Prospect(object.prospect);
      }
  }

}

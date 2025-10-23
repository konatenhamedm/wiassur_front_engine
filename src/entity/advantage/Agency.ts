/* eslint-disabled */
import Partner from "./Partner";
import AgencyExtend from "./extends/AgencyExtend";

export default class Agency extends AgencyExtend {

public id!: number;
public name = '';
public address? = '';
public partner!: Partner;

  constructor (object?: any) {
      super(object)
      if(object){
       this.id= object.id;
       this.name= object.name;
       this.address= object.address;
this.partner = (object.partner instanceof Partner) ? object.partner : object.partner ? new Partner(object.partner) : object.partner;
      }
      this.postConstruct()
  }

}

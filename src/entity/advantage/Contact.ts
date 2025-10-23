/* eslint-disabled */
import Partner from "./Partner";
import Advantage from "./Advantage";
import ContactExtend from "./extends/ContactExtend";

export default class Contact extends ContactExtend {

public id!: number;
public name = '';
public phone? = '';
public email? = '';
public role? = '';
public hourly? = '';
public partner!: Partner;
public advantage!: Advantage;

  constructor (object?: any) {
      super(object)
      if(object){
       this.id= object.id;
       this.name= object.name;
       this.phone= object.phone;
       this.email= object.email;
       this.role= object.role;
       this.hourly= object.hourly;
this.partner = (object.partner instanceof Partner) ? object.partner : object.partner ? new Partner(object.partner) : object.partner;
this.advantage = (object.advantage instanceof Advantage) ? object.advantage : object.advantage ? new Advantage(object.advantage) : object.advantage;
      }
      this.postConstruct()
  }

}

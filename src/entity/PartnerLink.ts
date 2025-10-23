/* eslint-disabled */
import Partner from "./Partner";
import PartnerLinkExtend from "@/entity/extends/PartnerLinkExtend";

export default class PartnerLink extends PartnerLinkExtend {

public id!: number;
public code = '';
public platform? = '';
public survey? = '';
public agent? = '';
public expireAt?: Date;
public visit!: number;
public role? = '';
public short? = '';
public partner!: Partner;
public enabled?: boolean;

  constructor (object?: any) {
      super(object)
      if(object){
       this.id= object.id;
       this.code= object.code;
       this.platform= object.platform;
       this.survey= object.survey;
       this.agent= object.agent;
       if(object.expireAt){
           this.expireAt= new Date(object.expireAt);
       }
       this.visit= object.visit;
       this.role= object.role;
       this.short= object.short;
this.partner = (object.partner instanceof Partner) ? object.partner : object.partner ? new Partner(object.partner) : object.partner;
       this.enabled= object.enabled;
      }
      this.postConstruct()
  }

}

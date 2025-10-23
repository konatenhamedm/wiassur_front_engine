/* eslint-disabled */
import Device from "./Device";
import ResponseGroup from "./ResponseGroup";
import LocationExtend from "@/entity/extends/LocationExtend";

export default class Location extends LocationExtend {

public id!: number;
public country? = '';
public city? = '';
public region? = '';
public company? = '';
public vpn?: boolean;
public proxy?: boolean;
public tor?: boolean;
public ip = '';
public device?: Device;
public countryCode? = '';
public responseGroups: Array<ResponseGroup> = [];

  constructor (object?: any) {
      super(object)
      if(object){
       this.id= object.id;
       this.country= object.country;
       this.city= object.city;
       this.region= object.region;
       this.company= object.company;
       this.vpn= object.vpn;
       this.proxy= object.proxy;
       this.tor= object.tor;
       this.ip= object.ip;
this.device = (object.device instanceof Device) ? object.device : new Device(object.device);
       this.countryCode= object.countryCode;
       if(object.responseGroups){
           object.responseGroups.forEach((occ: any)=>{
               const responsegroup= new ResponseGroup(occ);
               this.responseGroups.push(responsegroup);
           });
       }
      }
  }

}

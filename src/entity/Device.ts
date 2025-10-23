/* eslint-disabled */
import ResponseGroup from "./ResponseGroup";
import Prospect from "./Prospect";
import DeviceExtend from "@/entity/extends/DeviceExtend";

export default class Device extends DeviceExtend {

public id!: number;
public mac? = '';
public brand? = '';
public type? = '';
public os? = '';
public browser? = '';
public model? = '';
public responseGroups: Array<ResponseGroup> = [];
public prospects: Array<Prospect> = [];

  constructor (object?: any) {
      super(object)
      if(object){
       this.id= object.id;
       this.mac= object.mac;
       this.brand= object.brand;
       this.type= object.type;
       this.os= object.os;
       this.browser= object.browser;
       this.model= object.model;
       if(object.responseGroups){
           object.responseGroups.forEach((occ: any)=>{
               const responsegroup= new ResponseGroup(occ);
               this.responseGroups.push(responsegroup);
           });
       }
       if(object.prospects){
           object.prospects.forEach((occ: any)=>{
               const prospect= new Prospect(occ);
               this.prospects.push(prospect);
           });
       }
      }
  }

}

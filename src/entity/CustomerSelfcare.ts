/* eslint-disabled */
import Parrainage from "./Parrainage";
import Device from "./Device";
import Query from "./Query";
import CustomerSelfcareExtend from "@/entity/extends/CustomerSelfcareExtend";

export default class CustomerSelfcare extends CustomerSelfcareExtend {

public id = '';
public phone = '';
public roles: string[] = [];
public password = '';
public email? = '';
public name? = '';
public prename? = '';
public photo? = '';
public blocked? = '';
public code? = '';
public parrainages: Array<Parrainage> = [];
public affiliation!: Parrainage;
public devices: Array<Device> = [];
public queries: Array<Query> = [];
public uuid = '';
public createdAt?: Date;
public updatedAt?: Date;
public createdFromIp? = '';
public updatedFromIp? = '';
public createBy? = '';
public verificationCode? = '';
public verificationCodeGeneratedAt?: Date;
public verificationFailedCount?: number;
public verified? = '';

  constructor (object?: any) {
      super(object)
      if(object){
       this.id= object.id;
       this.phone= object.phone;
       this.roles= object.roles;
       this.password= object.password;
       this.email= object.email;
       this.name= object.name;
       this.prename= object.prename;
       this.photo= object.photo;
       this.blocked= object.blocked;
       this.code= object.code;
       if(object.parrainages){
           object.parrainages.forEach((occ: any)=>{
               const parrainage= occ instanceof Parrainage? occ :  new Parrainage(occ);
               this.parrainages.push(parrainage);
           });
       }
this.affiliation = (object.affiliation instanceof Parrainage) ? object.affiliation : object.affiliation ? new Parrainage(object.affiliation) : object.affiliation;
       if(object.devices){
           object.devices.forEach((occ: any)=>{
               const device= occ instanceof Device? occ :  new Device(occ);
               this.devices.push(device);
           });
       }
       if(object.queries){
           object.queries.forEach((occ: any)=>{
               const query= occ instanceof Query? occ :  new Query(occ);
               this.queries.push(query);
           });
       }
       this.uuid= object.uuid;
       if(object.createdAt){
           this.createdAt= new Date(object.createdAt);
       }
       if(object.updatedAt){
           this.updatedAt= new Date(object.updatedAt);
       }
       this.createdFromIp= object.createdFromIp;
       this.updatedFromIp= object.updatedFromIp;
       this.createBy= object.createBy;
       this.verificationCode= object.verificationCode;
       if(object.verificationCodeGeneratedAt){
           this.verificationCodeGeneratedAt= new Date(object.verificationCodeGeneratedAt);
       }
       this.verificationFailedCount= object.verificationFailedCount;
       this.verified= object.verified;
      }
      this.postConstruct()
  }

}

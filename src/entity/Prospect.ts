/* eslint-disabled */
import ResponseGroup from "./ResponseGroup";
import Preference from "./Preference";
import Company from "./Company";
import AdditionalInfo from "./AdditionalInfo";
import ProspectExtend from "@/entity/extends/ProspectExtend";

export default class Prospect extends ProspectExtend {

public id!: number;
public email? = '';
public code = '';
public responseGroups: Array<ResponseGroup> = [];
public mobile? = '';
public fixe? = '';
public salt = '';
public preference!: Preference;
public manager? = '';
public renewalCode? = '';
public contributions: Array<ResponseGroup> = [];
public name? = '';
public prename? = '';
public crm_id? = '';
public company!: Company;
public additionalInfos: Array<AdditionalInfo> = [];
public uuid? = '';
public createdAt?: Date;
public updatedAt?: Date;
public createBy? = '';
public updateBy? = '';
public removeBy? = '';
public createdFromIp? = '';
public updatedFromIp? = '';
public photo? = '';
public alt? = '';

  constructor (object?: any) {
      super(object)
      if(object){
       this.id= object.id;
       this.email= object.email;
       this.code= object.code;
       if(object.responseGroups){
           object.responseGroups.forEach((occ: any)=>{
               const responsegroup= occ instanceof ResponseGroup? occ :  new ResponseGroup(occ);
               this.responseGroups.push(responsegroup);
           });
       }
       this.mobile= object.mobile;
       this.fixe= object.fixe;
       this.salt= object.salt;
this.preference = (object.preference instanceof Preference) ? object.preference : object.preference ? new Preference(object.preference) : object.preference;
       this.manager= object.manager;
       this.renewalCode= object.renewalCode;
       if(object.contributions){
           object.contributions.forEach((occ: any)=>{
               const responsegroup= occ instanceof ResponseGroup? occ :  new ResponseGroup(occ);
               this.contributions.push(responsegroup);
           });
       }
       this.name= object.name;
       this.prename= object.prename;
       this.crm_id= object.crm_id;
this.company = (object.company instanceof Company) ? object.company : object.company ? new Company(object.company) : object.company;
       if(object.additionalInfos){
           object.additionalInfos.forEach((occ: any)=>{
               const additionalinfo= occ instanceof AdditionalInfo? occ :  new AdditionalInfo(occ);
               this.additionalInfos.push(additionalinfo);
           });
       }
       this.uuid= object.uuid;
       if(object.createdAt){
           this.createdAt= new Date(object.createdAt);
       }
       if(object.updatedAt){
           this.updatedAt= new Date(object.updatedAt);
       }
       this.createBy= object.createBy;
       this.updateBy= object.updateBy;
       this.removeBy= object.removeBy;
       this.createdFromIp= object.createdFromIp;
       this.updatedFromIp= object.updatedFromIp;
       this.photo= object.photo;
       this.alt= object.alt;
      }
      this.postConstruct()
  }

}

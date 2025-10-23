/* eslint-disabled */
import Prospect from "./Prospect";
import AdditionalInfo from "./AdditionalInfo";
import UniqProspect from "./UniqProspect";
import CompanyExtend from "@/entity/extends/CompanyExtend";

export default class Company extends CompanyExtend {

public id!: number;
public name = '';
public sector? = '';
public email? = '';
public number? = '';
public employees: Array<Prospect> = [];
public additionalInfos: Array<AdditionalInfo> = [];
public uniqProspects: Array<UniqProspect> = [];
public localisation? = '';
public size? = '';
public identifier? = '';
public membersNumber? = '';
public manager? = '';

  constructor (object?: any) {
      super(object)
      if(object){
       this.id= object.id;
       this.name= object.name;
       this.sector= object.sector;
       this.email= object.email;
       this.number= object.number;
       if(object.employees){
           object.employees.forEach((occ: any)=>{
               const prospect= occ instanceof Prospect? occ :  new Prospect(occ);
               this.employees.push(prospect);
           });
       }
       if(object.additionalInfos){
           object.additionalInfos.forEach((occ: any)=>{
               const additionalinfo= occ instanceof AdditionalInfo? occ :  new AdditionalInfo(occ);
               this.additionalInfos.push(additionalinfo);
           });
       }
       if(object.uniqProspects){
           object.uniqProspects.forEach((occ: any)=>{
               const uniqprospect= occ instanceof UniqProspect? occ :  new UniqProspect(occ);
               this.uniqProspects.push(uniqprospect);
           });
       }
       this.localisation= object.localisation;
       this.size= object.size;
       this.identifier= object.identifier;
       this.membersNumber= object.membersNumber;
       this.manager= object.manager;
      }
      this.postConstruct()
  }

}


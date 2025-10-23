/* eslint-disabled */
import SellCompany from "./SellCompany";
import SellContact from "./SellContact";
import SellEmail from "./SellEmail";
import SellAdditionalInfos from "./SellAdditionalInfos";
import SellHandShake from "./SellHandShake";
import SellActives from "./SellActives";
import SellCustomerExtend from "@/entity/extends/SellCustomerExtend";

export default class SellCustomer extends SellCustomerExtend {

public id = 0;
public name? = '';
public location? = '';
public gender? = '';
public age? = 0;
public company!: SellCompany;
public contacts: Array<SellContact> = [];
public emails: Array<SellEmail> = [];
public informations: Array<SellAdditionalInfos> = [];
public source? = '';
public prename? = '';
public mobile? = '';
public isVerified? = '';
public email? = '';
public fixe? = '';
public isClient? = '';
public status = '';
public partner? = '';
public godfather? = '';
public prospectUuid? = '';
public handshakes: Array<SellHandShake> = [];
public manager? = '';
public actives: Array<SellActives> = [];
public uuid? = '';
public createdAt?: Date;
public updatedAt?: Date;
public createBy? = '';
public updateBy? = '';
public removeBy? = '';
public createdFromIp? = '';
public updatedFromIp? = '';

  constructor (object?: any) {
      super(object)
      if(object){
       this.id= object.id;
       this.name= object.name;
       this.location= object.location;
       this.gender= object.gender;
       this.age= object.age;
this.company = (object.company instanceof SellCompany) ? object.company : object.company ? new SellCompany(object.company) : object.company;
       if(object.contacts){
           object.contacts.forEach((occ: any)=>{
               const sellcontact= occ instanceof SellContact? occ :  new SellContact(occ);
               this.contacts.push(sellcontact);
           });
       }
       if(object.emails){
           object.emails.forEach((occ: any)=>{
               const sellemail= occ instanceof SellEmail? occ :  new SellEmail(occ);
               this.emails.push(sellemail);
           });
       }
       if(object.informations){
           object.informations.forEach((occ: any)=>{
               const selladditionalinfos= occ instanceof SellAdditionalInfos? occ :  new SellAdditionalInfos(occ);
               this.informations.push(selladditionalinfos);
           });
       }
       this.source= object.source;
       this.prename= object.prename;
       this.mobile= object.mobile;
       this.isVerified= object.isVerified;
       this.email= object.email;
       this.fixe= object.fixe;
       this.isClient= object.isClient;
       this.status= object.status;
       this.partner= object.partner;
       this.godfather= object.godfather;
       this.prospectUuid= object.prospectUuid;
       if(object.handshakes){
           object.handshakes.forEach((occ: any)=>{
               const sellhandshake= occ instanceof SellHandShake? occ :  new SellHandShake(occ);
               this.handshakes.push(sellhandshake);
           });
       }
       this.manager= object.manager;
       if(object.actives){
           object.actives.forEach((occ: any)=>{
               const sellactives= occ instanceof SellActives? occ :  new SellActives(occ);
               this.actives.push(sellactives);
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
      }
      this.postConstruct()
  }

}

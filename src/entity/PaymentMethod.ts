/* eslint-disabled */
import Partner from "./Partner";
import PaymentTransaction from "./PaymentTransaction";
import Account from "./Account";
import PaymentMethodExtend from "@/entity/extends/PaymentMethodExtend";

export default class PaymentMethod extends PaymentMethodExtend {

public id!: number;
public label = '';
public slug = '';
public active!: boolean;
public partners: Array<Partner> = [];
public transactions: Array<PaymentTransaction> = [];
public requireManagerValidation?: boolean;
public requirePhoneNumber?: boolean;
public uuid? = '';
public createdAt? = '';
public updatedAt? = '';
public createBy? = '';
public updateBy? = '';
public removeBy? = '';
public createdFromIp? = '';
public updatedFromIp? = '';
public photo? = '';
public alt? = '';
public ranking? = '';
public account!: Account;

  constructor (object?: any) {
      super(object)
      if(object){
       this.id= object.id;
       this.label= object.label;
       this.slug= object.slug;
       this.active= object.active;
       if(object.partners){
           object.partners.forEach((occ: any)=>{
               const partner= occ instanceof Partner? occ :  new Partner(occ);
               this.partners.push(partner);
           });
       }
       if(object.transactions){
           object.transactions.forEach((occ: any)=>{
               const paymenttransaction= occ instanceof PaymentTransaction? occ :  new PaymentTransaction(occ);
               this.transactions.push(paymenttransaction);
           });
       }
       this.requireManagerValidation= object.requireManagerValidation;
       this.requirePhoneNumber= object.requirePhoneNumber;
       this.uuid= object.uuid;
       this.createdAt= object.createdAt;
       this.updatedAt= object.updatedAt;
       this.createBy= object.createBy;
       this.updateBy= object.updateBy;
       this.removeBy= object.removeBy;
       this.createdFromIp= object.createdFromIp;
       this.updatedFromIp= object.updatedFromIp;
       this.photo= object.photo;
       this.alt= object.alt;
       this.ranking= object.ranking;
this.account = (object.account instanceof Account) ? object.account : object.account ? new Account(object.account) : object.account;
      }
      this.postConstruct()
  }

}

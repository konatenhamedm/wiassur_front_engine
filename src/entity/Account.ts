/* eslint-disabled */
import AccountOperation from "./AccountOperation";
import PaymentTransaction from "./PaymentTransaction";
import AccountExtend from "@/entity/extends/AccountExtend";

export default class Account extends AccountExtend {

public id = '';
public balance = '';
public isMaster = '';
public operations: Array<AccountOperation> = [];
public type? = '';
public payments: Array<PaymentTransaction> = [];
public inputs: Array<PaymentTransaction> = [];
public owner? = '';
public maxAllowed?: number;
public minAllowed?: number;
public uuid? = '';
public createdAt? = '';
public updatedAt? = '';
public createBy? = '';
public updateBy? = '';
public removeBy? = '';
public createdFromIp? = '';
public updatedFromIp? = '';

  constructor (object?: any) {
      super(object)
      if(object){
       this.id= object.id;
       this.balance= object.balance;
       this.isMaster= object.isMaster;
       if(object.operations){
           object.operations.forEach((occ: any)=>{
               const accountoperation= occ instanceof AccountOperation? occ :  new AccountOperation(occ);
               this.operations.push(accountoperation);
           });
       }
       this.type= object.type;
       if(object.payments){
           object.payments.forEach((occ: any)=>{
               const paymenttransaction= occ instanceof PaymentTransaction? occ :  new PaymentTransaction(occ);
               this.payments.push(paymenttransaction);
           });
       }
       if(object.inputs){
           object.inputs.forEach((occ: any)=>{
               const paymenttransaction= occ instanceof PaymentTransaction? occ :  new PaymentTransaction(occ);
               this.inputs.push(paymenttransaction);
           });
       }
       this.owner= object.owner;
       this.maxAllowed= object.maxAllowed;
       this.minAllowed= object.minAllowed;
       this.uuid= object.uuid;
       this.createdAt= object.createdAt;
       this.updatedAt= object.updatedAt;
       this.createBy= object.createBy;
       this.updateBy= object.updateBy;
       this.removeBy= object.removeBy;
       this.createdFromIp= object.createdFromIp;
       this.updatedFromIp= object.updatedFromIp;
      }
      this.postConstruct()
  }

}

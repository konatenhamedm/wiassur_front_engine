/* eslint-disabled */
import Customer from "./Customer";
import PaymentTransaction from "./PaymentTransaction";
import ReceiptExtend from "@/entity/extends/ReceiptExtend";

export default class Receipt extends ReceiptExtend {

public id = '';
public customer!: Customer;
public amount? = '';
public balance? = '';
public transactions: Array<PaymentTransaction> = [];
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
this.customer = (object.customer instanceof Customer) ? object.customer : object.customer ? new Customer(object.customer) : object.customer;
       this.amount= object.amount;
       this.balance= object.balance;
       if(object.transactions){
           object.transactions.forEach((occ: any)=>{
               const paymenttransaction= occ instanceof PaymentTransaction? occ :  new PaymentTransaction(occ);
               this.transactions.push(paymenttransaction);
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

/* eslint-disabled */
import Customer from "./Customer";
import Avenant from "./Avenant";
import PaymentTransaction from "./PaymentTransaction";
import Account from "./Account";
import InvoiceExtend from "@/entity/extends/InvoiceExtend";

export default class Invoice extends InvoiceExtend {

public id!: number;
public number = '';
public customer!: Customer;
public dueDate = '';
public status = '';
public premium!: number;
public avenant!: Avenant;
public parent!: Invoice;
public subInvoices: Array<Invoice> = [];
public transactions: Array<PaymentTransaction> = [];
public uuid? = '';
public createdAt? = '';
public updatedAt? = '';
public createBy? = '';
public updateBy? = '';
public removeBy? = '';
public createdFromIp? = '';
public updatedFromIp? = '';
public account!: Account;

  constructor (object?: any) {
      super(object)
      if(object){
       this.id= object.id;
       this.number= object.number;
this.customer = (object.customer instanceof Customer) ? object.customer : object.customer ? new Customer(object.customer) : object.customer;
       this.dueDate= object.dueDate;
       this.status= object.status;
       this.premium= object.premium;
this.avenant = (object.avenant instanceof Avenant) ? object.avenant : object.avenant ? new Avenant(object.avenant) : object.avenant;
this.parent = (object.parent instanceof Invoice) ? object.parent : object.parent ? new Invoice(object.parent) : object.parent;
       if(object.subInvoices){
           object.subInvoices.forEach((occ: any)=>{
               const invoice= occ instanceof Invoice? occ :  new Invoice(occ);
               this.subInvoices.push(invoice);
           });
       }
       if(object.transactions){
           object.transactions.forEach((occ: any)=>{
               const paymenttransaction= occ instanceof PaymentTransaction? occ :  new PaymentTransaction(occ);
               this.transactions.push(paymenttransaction);
           });
       }
       this.uuid= object.uuid;
       this.createdAt= object.createdAt;
       this.updatedAt= object.updatedAt;
       this.createBy= object.createBy;
       this.updateBy= object.updateBy;
       this.removeBy= object.removeBy;
       this.createdFromIp= object.createdFromIp;
       this.updatedFromIp= object.updatedFromIp;
this.account = (object.account instanceof Account) ? object.account : object.account ? new Account(object.account) : object.account;
      }
      this.postConstruct()
  }

}

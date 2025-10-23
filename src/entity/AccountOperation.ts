/* eslint-disabled */
import Account from "./Account";
import PaymentTransaction from "./PaymentTransaction";
import AccountOperationExtend from "@/entity/extends/AccountOperationExtend";

export default class AccountOperation extends AccountOperationExtend {

public id = '';
public description? = '';
public type = '';
public amount = '';
public account!: Account;
public debitTransaction!: PaymentTransaction;
public creditTransaction!: PaymentTransaction;
public uuid? = '';
public createdAt? = '';
public updatedAt? = '';
public createBy? = '';
public updateBy? = '';
public removeBy? = '';
public createdFromIp? = '';
public updatedFromIp? = '';
public deletedAt? = '';

  constructor (object?: any) {
      super(object)
      if(object){
       this.id= object.id;
       this.description= object.description;
       this.type= object.type;
       this.amount= object.amount;
this.account = (object.account instanceof Account) ? object.account : object.account ? new Account(object.account) : object.account;
this.debitTransaction = (object.debitTransaction instanceof PaymentTransaction) ? object.debitTransaction : object.debitTransaction ? new PaymentTransaction(object.debitTransaction) : object.debitTransaction;
this.creditTransaction = (object.creditTransaction instanceof PaymentTransaction) ? object.creditTransaction : object.creditTransaction ? new PaymentTransaction(object.creditTransaction) : object.creditTransaction;
       this.uuid= object.uuid;
       this.createdAt= object.createdAt;
       this.updatedAt= object.updatedAt;
       this.createBy= object.createBy;
       this.updateBy= object.updateBy;
       this.removeBy= object.removeBy;
       this.createdFromIp= object.createdFromIp;
       this.updatedFromIp= object.updatedFromIp;
       this.deletedAt= object.deletedAt;
      }
      this.postConstruct()
  }

}

/* eslint-disabled */
import User from "./User";
import Customer from "./Customer";
import LinkExtend from "@/entity/extends/LinkExtend";

export default class Link extends LinkExtend {

public id!: number;
public data= [];
public type = '';
public identifier? = '';
public uuid = '';
public createdAt?: Date;
public updatedAt?: Date;
public createBy?: User;
public createByCustomer?: Customer;
public updateBy?: User;
public updateByCustomer?: Customer;
public removeBy?: User;
public createdFromIp? = '';
public updatedFromIp? = '';

  constructor (object?: any) {
      super(object)
      if(object){
       this.id= object.id;
       this.data= object.data;
       this.type= object.type;
       this.identifier= object.identifier;
       this.uuid= object.uuid;
       if(object.createdAt){
           this.createdAt= new Date(object.createdAt);
       }
       if(object.updatedAt){
           this.updatedAt= new Date(object.updatedAt);
       }
this.createBy = (object.createBy instanceof User) ? object.createBy : new User(object.createBy);
this.createByCustomer = (object.createByCustomer instanceof Customer) ? object.createByCustomer : new Customer(object.createByCustomer);
this.updateBy = (object.updateBy instanceof User) ? object.updateBy : new User(object.updateBy);
this.updateByCustomer = (object.updateByCustomer instanceof Customer) ? object.updateByCustomer : new Customer(object.updateByCustomer);
this.removeBy = (object.removeBy instanceof User) ? object.removeBy : new User(object.removeBy);
       this.createdFromIp= object.createdFromIp;
       this.updatedFromIp= object.updatedFromIp;
      }
  }

}

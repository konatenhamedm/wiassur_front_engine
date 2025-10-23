/* eslint-disable */
import Customer from "./Customer";
import User from "./User";
import EnterpriseExtend from "@/entity/extends/EnterpriseExtend";

export default class Enterprise extends EnterpriseExtend {

public id!: number;
public label = '';
public rccm = '';
public activity = '';
public employees: Array<Customer> = [];
public uuid = '';
public createdAt?: Date;
public updatedAt?: Date;
public createBy?: User;
public updateBy?: User;
public removeBy?: User;
public createdFromIp? = '';
public updatedFromIp? = '';
public deletedAt?: Date;

  constructor (object?: any) {
      super(object)
      if(object){
       this.id= object.id;
       this.label= object.label;
       this.rccm= object.rccm;
       this.activity= object.activity;
       if(object.employees){
           object.employees.forEach((occ: any)=>{
               const customer= new Customer(occ);
               this.employees.push(customer);
           });
       }
       this.uuid= object.uuid;
       if(object.createdAt){
           this.createdAt= new Date(object.createdAt);
       }
       if(object.updatedAt){
           this.updatedAt= new Date(object.updatedAt);
       }
this.createBy = (object.createBy instanceof User) ? object.createBy : new User(object.createBy);
this.updateBy = (object.updateBy instanceof User) ? object.updateBy : new User(object.updateBy);
this.removeBy = (object.removeBy instanceof User) ? object.removeBy : new User(object.removeBy);
       this.createdFromIp= object.createdFromIp;
       this.updatedFromIp= object.updatedFromIp;
       if(object.deletedAt){
           this.deletedAt= new Date(object.deletedAt);
       }
      }
  }

}

/* eslint-disable */

import Customer from "./Customer";
import User from "./User";
import AppointmentExtend from "@/entity/extends/AppointmentExtend";

export default class Appointment extends AppointmentExtend {

public id!: number;
public subject = '';
public date!: Date;
public phone? = '';
public email = '';
public customer?: Customer;
public status = '';
public uuid = '';
public createdAt?: Date;
public updatedAt?: Date;
public createBy?: User;
public updateBy?: User;
public removeBy?: User;
public createdFromIp? = '';
public updatedFromIp? = '';

  constructor (object?: any) {
      super(object)
      if(object){
       this.id= object.id;
       this.subject= object.subject;
       if(object.date){
           this.date= new Date(object.date);
       }
       this.phone= object.phone;
       this.email= object.email;
this.customer = (object.customer instanceof Customer) ? object.customer : new Customer(object.customer);
       this.status= object.status;
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
      }
  }

}

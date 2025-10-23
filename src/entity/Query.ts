/* eslint-disabled */
import Customer from "./Customer";
import QueryExtend from "./extends/QueryExtend";

export default class Query extends QueryExtend {

public id = '';
public customer!: Customer;
public type = '';
public data? = '';
public processed? = '';
public createdAt?: Date;
public updatedAt?: Date;

  constructor (object?: any) {
      super(object)
      if(object){
       this.id= object.id;
this.customer = (object.customer instanceof Customer) ? object.customer : object.customer ? new Customer(object.customer) : object.customer;
       this.type= object.type;
       this.data= object.data;
       this.processed= object.processed;
       if(object.createdAt){
           this.createdAt= new Date(object.createdAt);
       }
       if(object.updatedAt){
           this.updatedAt= new Date(object.updatedAt);
       }
      }
      this.postConstruct()
  }

}

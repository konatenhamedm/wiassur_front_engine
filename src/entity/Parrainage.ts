/* eslint-disabled */
import Customer from "./Customer";
import ParrainageExtend from "@/entity/extends/ParrainageExtend";

export default class Parrainage extends ParrainageExtend {

public id = '';
public godfather!: Customer;
public godson!: Customer;
public responseGroup? = '';
public contract? = '';
public contractPremium? = '';
public godfatherPremium? = '';
public godsonPremium? = '';
public validatedAt? = '';
public orderUuid? = '';
public uuid = '';
public createdAt?: Date;
public updatedAt?: Date;
public createdFromIp? = '';
public updatedFromIp? = '';
public createBy? = '';

  constructor (object?: any) {
      super(object)
      if(object){
       this.id= object.id;
this.godfather = (object.godfather instanceof Customer) ? object.godfather : object.godfather ? new Customer(object.godfather) : object.godfather;
this.godson = (object.godson instanceof Customer) ? object.godson : object.godson ? new Customer(object.godson) : object.godson;
       this.responseGroup= object.responseGroup;
       this.contract= object.contract;
       this.contractPremium= object.contractPremium;
       this.godfatherPremium= object.godfatherPremium;
       this.godsonPremium= object.godsonPremium;
       this.validatedAt= object.validatedAt;
       this.orderUuid= object.orderUuid;
       this.uuid= object.uuid;
       if(object.createdAt){
           this.createdAt= new Date(object.createdAt);
       }
       if(object.updatedAt){
           this.updatedAt= new Date(object.updatedAt);
       }
       this.createdFromIp= object.createdFromIp;
       this.updatedFromIp= object.updatedFromIp;
       this.createBy= object.createBy;
      }
      this.postConstruct()
  }

}

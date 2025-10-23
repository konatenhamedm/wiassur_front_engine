/* eslint-disabled */
import SellCustomer from "./SellCustomer";
import SellCompanyExtend from "@/entity/extends/SellCompanyExtend";

export default class SellCompany extends SellCompanyExtend {

public id = 0;
public name? = '';
public location? = '';
public contact? = '';
public email? = '';
public employees: Array<SellCustomer> = [];

  constructor (object?: any) {
      super(object)
      if(object){
       this.id= object.id;
       this.name= object.name;
       this.location= object.location;
       this.contact= object.contact;
       this.email= object.email;
       if(object.employees){
           object.employees.forEach((occ: any)=>{
               const sellcustomer= occ instanceof SellCustomer? occ :  new SellCustomer(occ);
               this.employees.push(sellcustomer);
           });
       }
      }
      this.postConstruct()
  }

}

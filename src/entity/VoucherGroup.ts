/* eslint-disabled */
import Voucher from "./Voucher";
import VoucherGroupExtend from "@/entity/extends/VoucherGroupExtend";

export default class VoucherGroup extends VoucherGroupExtend {

public id!: number;
public name = '';
public description? = '';
public vouchers: Array<Voucher> = [];

  constructor (object?: any) {
      super(object)
      if(object){
       this.id= object.id;
       this.name= object.name;
       this.description= object.description;
       if(object.vouchers){
           object.vouchers.forEach((occ: any)=>{
               const voucher= occ instanceof Voucher? occ :  new Voucher(occ);
               this.vouchers.push(voucher);
           });
       }
      }
      this.postConstruct()
  }

}

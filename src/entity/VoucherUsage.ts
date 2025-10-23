/* eslint-disabled */
import Voucher from "./Voucher";
import VoucherUsageExtend from "@/entity/extends/VoucherUsageExtend";

export default class VoucherUsage extends VoucherUsageExtend {

public id!: number;
public phoneNumber = '';
public dateUsed?: Date;
public voucher!: Voucher;

  constructor (object?: any) {
      super(object)
      if(object){
       this.id= object.id;
       this.phoneNumber= object.phoneNumber;
       if(object.dateUsed){
           this.dateUsed= new Date(object.dateUsed);
       }
this.voucher = (object.voucher instanceof Voucher) ? object.voucher : object.voucher ? new Voucher(object.voucher) : object.voucher;
      }
      this.postConstruct()
  }

}

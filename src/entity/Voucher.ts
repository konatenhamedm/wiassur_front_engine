/* eslint-disabled */
import VoucherGroup from "./VoucherGroup";
import EngineMethod from "./EngineMethod";
import Avenant from "./Avenant";
import VoucherExtend from "@/entity/extends/VoucherExtend";

export default class Voucher extends VoucherExtend {

public id!: number;
public label? = '';
public code? = '';
public maxUse!: number;
public voucherGroup!: VoucherGroup;
public branchs= [];
public insurers= [];
public packs= [];
public value!: number;
public type = '';
public isActive!: boolean;
public maxUseByCustomer!: number;
public methodAffect!: EngineMethod;
public startDate?: Date;
public endDate?: Date;
public avenants: Array<Avenant> = [];

  constructor (object?: any) {
      super(object)
      if(object){
       this.id= object.id;
       this.label= object.label;
       this.code= object.code;
       this.maxUse= object.maxUse;
this.voucherGroup = (object.voucherGroup instanceof VoucherGroup) ? object.voucherGroup : object.voucherGroup ? new VoucherGroup(object.voucherGroup) : object.voucherGroup;
       this.branchs= object.branchs;
       this.insurers= object.insurers;
       this.packs= object.packs;
       this.value= object.value;
       this.type= object.type;
       this.isActive= object.isActive;
       this.maxUseByCustomer= object.maxUseByCustomer;
this.methodAffect = (object.methodAffect instanceof EngineMethod) ? object.methodAffect : object.methodAffect ? new EngineMethod(object.methodAffect) : object.methodAffect;
       if(object.startDate){
           this.startDate= new Date(object.startDate);
       }
       if(object.endDate){
           this.endDate= new Date(object.endDate);
       }
       if(object.avenants){
           object.avenants.forEach((occ: any)=>{
               const avenant= occ instanceof Avenant? occ :  new Avenant(occ);
               this.avenants.push(avenant);
           });
       }
      }
      this.postConstruct()
  }

}

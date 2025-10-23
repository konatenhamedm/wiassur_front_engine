/* eslint-disabled */
import BranchCategory from "./BranchCategory";
import ItemType from "./ItemType";
import Contract from "./Contract";
import PackCategory from "./PackCategory";
import Guarantee from "./Guarantee";
import PremiumDetailModel from "./PremiumDetailModel";
import Engine from "./Engine";
import Voucher from "./Voucher";
import CommissionModel from "./CommissionModel";
import ReductionModel from "./ReductionModel";
import AvenantType from "./AvenantType";
import BranchExtend from "@/entity/extends/BranchExtend";

export default class Branch extends BranchExtend {

public id!: number;
public label = '';
public icon = '';
public slug = '';
public description? = '';
public category!: BranchCategory;
public items: Array<ItemType> = [];
public ranking?: number;
public active?: boolean;
public contracts: Array<Contract> = [];
public packCategories: Array<PackCategory> = [];
public color? = '';
public guarantees: Array<Guarantee> = [];
public premiumDetailModels: Array<PremiumDetailModel> = [];
public engines: Array<Engine> = [];
public version?: number;
public vouchers: Array<Voucher> = [];
public startDate? = '';
public orderText? = '';
public illustration? = '';
public commissionModels: Array<CommissionModel> = [];
public reductionModels: Array<ReductionModel> = [];
public allowOrder?: boolean;
public avenantTypes: Array<AvenantType> = [];
public itemType!: ItemType;
public deletedAt?: Date;
public uuid? = '';
public createdAt?: Date;
public updatedAt?: Date;
public createBy? = '';
public updateBy? = '';
public removeBy? = '';
public createdFromIp? = '';
public updatedFromIp? = '';
public printables= [];
public photo? = '';
public alt? = '';

  constructor (object?: any) {
      super(object)
      if(object){
       this.id= object.id;
       this.label= object.label;
       this.icon= object.icon;
       this.slug= object.slug;
       this.description= object.description;
this.category = (object.category instanceof BranchCategory) ? object.category : object.category ? new BranchCategory(object.category) : object.category;
       if(object.items){
           object.items.forEach((occ: any)=>{
               const itemtype= occ instanceof ItemType? occ :  new ItemType(occ);
               this.items.push(itemtype);
           });
       }
       this.ranking= object.ranking;
       this.active= object.active;
       if(object.contracts){
           object.contracts.forEach((occ: any)=>{
               const contract= occ instanceof Contract? occ :  new Contract(occ);
               this.contracts.push(contract);
           });
       }
       if(object.packCategories){
           object.packCategories.forEach((occ: any)=>{
               const packcategory= occ instanceof PackCategory? occ :  new PackCategory(occ);
               this.packCategories.push(packcategory);
           });
       }
       this.color= object.color;
       if(object.guarantees){
           object.guarantees.forEach((occ: any)=>{
               const guarantee= occ instanceof Guarantee? occ :  new Guarantee(occ);
               this.guarantees.push(guarantee);
           });
       }
       if(object.premiumDetailModels){
           object.premiumDetailModels.forEach((occ: any)=>{
               const premiumdetailmodel= occ instanceof PremiumDetailModel? occ :  new PremiumDetailModel(occ);
               this.premiumDetailModels.push(premiumdetailmodel);
           });
       }
       if(object.engines){
           object.engines.forEach((occ: any)=>{
               const engine= occ instanceof Engine? occ :  new Engine(occ);
               this.engines.push(engine);
           });
       }
       this.version= object.version;
       if(object.vouchers){
           object.vouchers.forEach((occ: any)=>{
               const voucher= occ instanceof Voucher? occ :  new Voucher(occ);
               this.vouchers.push(voucher);
           });
       }
       this.startDate= object.startDate;
       this.orderText= object.orderText;
       this.illustration= object.illustration;
       if(object.commissionModels){
           object.commissionModels.forEach((occ: any)=>{
               const commissionmodel= occ instanceof CommissionModel? occ :  new CommissionModel(occ);
               this.commissionModels.push(commissionmodel);
           });
       }
       if(object.reductionModels){
           object.reductionModels.forEach((occ: any)=>{
               const reductionmodel= occ instanceof ReductionModel? occ :  new ReductionModel(occ);
               this.reductionModels.push(reductionmodel);
           });
       }
       this.allowOrder= object.allowOrder;
       if(object.avenantTypes){
           object.avenantTypes.forEach((occ: any)=>{
               const avenanttype= occ instanceof AvenantType? occ :  new AvenantType(occ);
               this.avenantTypes.push(avenanttype);
           });
       }
this.itemType = (object.itemType instanceof ItemType) ? object.itemType : object.itemType ? new ItemType(object.itemType) : object.itemType;
       if(object.deletedAt){
           this.deletedAt= new Date(object.deletedAt);
       }
       this.uuid= object.uuid;
       if(object.createdAt){
           this.createdAt= new Date(object.createdAt);
       }
       if(object.updatedAt){
           this.updatedAt= new Date(object.updatedAt);
       }
       this.createBy= object.createBy;
       this.updateBy= object.updateBy;
       this.removeBy= object.removeBy;
       this.createdFromIp= object.createdFromIp;
       this.updatedFromIp= object.updatedFromIp;
       this.printables= object.printables;
       this.photo= object.photo;
       this.alt= object.alt;
      }
      this.postConstruct()
  }

}

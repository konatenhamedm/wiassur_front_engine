/* eslint-disabled */
import Pack from "./Pack";
import Contract from "./Contract";
import EngineMethod from "./EngineMethod";
import BrownCard from "./BrownCard";
import Avenant from "./Avenant";
import Repayment from "./Repayment";
import AvenantType from "./AvenantType";
import ItemType from "./ItemType";
import Account from "./Account";
import InsurerExtend from "@/entity/extends/InsurerExtend";

export default class Insurer extends InsurerExtend {

public id!: number;
public label = '';
public slug = '';
public active?: boolean;
public packs: Array<Pack> = [];
public contracts: Array<Contract> = [];
public lastPolicyNumber!: number;
public address? = '';
public methods: Array<EngineMethod> = [];
public codeCompagnie? = '';
public codeIntermediaire? = '';
public codeAutorisation? = '';
public brownCards: Array<BrownCard> = [];
public eAttestationCountYellow?: number;
public phoneNumber? = '';
public email? = '';
public eAttestationCountGreen?: number;
public eAttestationCountBlue?: number;
public avenants: Array<Avenant> = [];
public repayments: Array<Repayment> = [];
public avenantTypes: Array<AvenantType> = [];
public uuid? = '';
public createdAt?: Date;
public updatedAt?: Date;
public createBy? = '';
public updateBy? = '';
public removeBy? = '';
public createdFromIp? = '';
public updatedFromIp? = '';
public photo? = '';
public alt? = '';
public ranking?: number;
public itemType!: ItemType;
public account!: Account;

  constructor (object?: any) {
      super(object)
      if(object){
       this.id= object.id;
       this.label= object.label;
       this.slug= object.slug;
       this.active= object.active;
       if(object.packs){
           object.packs.forEach((occ: any)=>{
               const pack= occ instanceof Pack? occ :  new Pack(occ);
               this.packs.push(pack);
           });
       }
       if(object.contracts){
           object.contracts.forEach((occ: any)=>{
               const contract= occ instanceof Contract? occ :  new Contract(occ);
               this.contracts.push(contract);
           });
       }
       this.lastPolicyNumber= object.lastPolicyNumber;
       this.address= object.address;
       if(object.methods){
           object.methods.forEach((occ: any)=>{
               const enginemethod= occ instanceof EngineMethod? occ :  new EngineMethod(occ);
               this.methods.push(enginemethod);
           });
       }
       this.codeCompagnie= object.codeCompagnie;
       this.codeIntermediaire= object.codeIntermediaire;
       this.codeAutorisation= object.codeAutorisation;
       if(object.brownCards){
           object.brownCards.forEach((occ: any)=>{
               const browncard= occ instanceof BrownCard? occ :  new BrownCard(occ);
               this.brownCards.push(browncard);
           });
       }
       this.eAttestationCountYellow= object.eAttestationCountYellow;
       this.phoneNumber= object.phoneNumber;
       this.email= object.email;
       this.eAttestationCountGreen= object.eAttestationCountGreen;
       this.eAttestationCountBlue= object.eAttestationCountBlue;
       if(object.avenants){
           object.avenants.forEach((occ: any)=>{
               const avenant= occ instanceof Avenant? occ :  new Avenant(occ);
               this.avenants.push(avenant);
           });
       }
       if(object.repayments){
           object.repayments.forEach((occ: any)=>{
               const repayment= occ instanceof Repayment? occ :  new Repayment(occ);
               this.repayments.push(repayment);
           });
       }
       if(object.avenantTypes){
           object.avenantTypes.forEach((occ: any)=>{
               const avenanttype= occ instanceof AvenantType? occ :  new AvenantType(occ);
               this.avenantTypes.push(avenanttype);
           });
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
       this.photo= object.photo;
       this.alt= object.alt;
       this.ranking= object.ranking;
this.itemType = (object.itemType instanceof ItemType) ? object.itemType : object.itemType ? new ItemType(object.itemType) : object.itemType;
this.account = (object.account instanceof Account) ? object.account : object.account ? new Account(object.account) : object.account;
      }
      this.postConstruct()
  }

}

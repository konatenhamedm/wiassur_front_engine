/* eslint-disabled */
import PremiumDetail from "./PremiumDetail";
import Contract from "./Contract";
import Item from "./Item";
import PaymentTransaction from "./PaymentTransaction";
import DemandeAttestation from "./DemandeAttestation";
import Commission from "./Commission";
import Partner from "./Partner";
import Insurer from "./Insurer";
import Invoice from "./Invoice";
import Reduction from "./Reduction";
import Repayment from "./Repayment";
import AvenantType from "./AvenantType";
import Account from "./Account";
import AvenantExtend from "@/entity/extends/AvenantExtend";
import Asset from "./Asset";

export default class Avenant extends AvenantExtend {

public id!: number;
public dateEffet!: Date;
public dateEcheance?: Date;
public numero!: number;
public status = '';
public type = '';
public duree? = '';
public premiumDetails: Array<PremiumDetail> = [];
public primeTTC!: number;
public contract!: Contract;
public root!: Item;
public itemsIn: Array<Item> = [];
public itemsOut: Array<Item> = [];
public dateEmission?: Date;
public source? = '';
public emitBy? = '';
public userData= [];
public transactions: Array<PaymentTransaction> = [];
public primeNette?: number;
public demandeAttestations: Array<DemandeAttestation> = [];
public paymentLink? = '';
public orderUuid? = '';
public godfather? = '';
public commissions: Array<Commission> = [];
public partner!: Partner;
public contracts: Array<Contract> = [];
public insurer!: Insurer;
public manager? = '';
public police? = '';
public invoices: Array<Invoice> = [];
public reductions: Array<Reduction> = [];
public items: Array<Item> = [];
public repayment!: Repayment;
public repayedAt?: Date;
public repaymentProcessedAt?: Date;
public avenantType!: AvenantType;
public uuid? = '';
public createdAt?: Date;
public updatedAt?: Date;
public createBy? = '';
public updateBy? = '';
public removeBy? = '';
public createdFromIp? = '';
public updatedFromIp? = '';
public item!: Item;
public files: Array<Asset> = [];
public account!: Account;
public deletedAt?: Date;

  constructor (object?: any) {
      super(object)
      if(object){
       this.id= object.id;
       if(object.dateEffet){
           this.dateEffet= new Date(object.dateEffet);
       }
       if(object.dateEcheance){
           this.dateEcheance= new Date(object.dateEcheance);
       }
       this.numero= object.numero;
       this.status= object.status;
       this.type= object.type;
       this.duree= object.duree;
       if(object.files){
           object.files.forEach((occ: any)=>{
               const file= occ instanceof Asset? occ :  new Asset(occ);
               this.files.push(file);
           });
       }
       if(object.premiumDetails){
           object.premiumDetails.forEach((occ: any)=>{
               const premiumdetail= occ instanceof PremiumDetail? occ :  new PremiumDetail(occ);
               this.premiumDetails.push(premiumdetail);
           });
       }
       this.primeTTC= object.primeTTC;
this.contract = (object.contract instanceof Contract) ? object.contract : object.contract ? new Contract(object.contract) : object.contract;
this.root = (object.root instanceof Item) ? object.root : object.root ? new Item(object.root) : object.root;
       if(object.itemsIn){
           object.itemsIn.forEach((occ: any)=>{
               const item= occ instanceof Item? occ :  new Item(occ);
               this.itemsIn.push(item);
           });
       }
       if(object.itemsOut){
           object.itemsOut.forEach((occ: any)=>{
               const item= occ instanceof Item? occ :  new Item(occ);
               this.itemsOut.push(item);
           });
       }
       if(object.dateEmission){
           this.dateEmission= new Date(object.dateEmission);
       }
       this.source= object.source;
       this.emitBy= object.emitBy;
       this.userData= object.userData;
       if(object.transactions){
           object.transactions.forEach((occ: any)=>{
               const paymenttransaction= occ instanceof PaymentTransaction? occ :  new PaymentTransaction(occ);
               this.transactions.push(paymenttransaction);
           });
       }
       this.primeNette= object.primeNette;
       if(object.demandeAttestations){
           object.demandeAttestations.forEach((occ: any)=>{
               const demandeattestation= occ instanceof DemandeAttestation? occ :  new DemandeAttestation(occ);
               this.demandeAttestations.push(demandeattestation);
           });
       }
       this.paymentLink= object.paymentLink;
       this.orderUuid= object.orderUuid;
       this.godfather= object.godfather;
       if(object.commissions){
           object.commissions.forEach((occ: any)=>{
               const commission= occ instanceof Commission? occ :  new Commission(occ);
               this.commissions.push(commission);
           });
       }
this.partner = (object.partner instanceof Partner) ? object.partner : object.partner ? new Partner(object.partner) : object.partner;
       if(object.contracts){
           object.contracts.forEach((occ: any)=>{
               const contract= occ instanceof Contract? occ :  new Contract(occ);
               this.contracts.push(contract);
           });
       }
this.insurer = (object.insurer instanceof Insurer) ? object.insurer : object.insurer ? new Insurer(object.insurer) : object.insurer;
       this.manager= object.manager;
       this.police= object.police;
       if(object.invoices){
           object.invoices.forEach((occ: any)=>{
               const invoice= occ instanceof Invoice? occ :  new Invoice(occ);
               this.invoices.push(invoice);
           });
       }
       if(object.reductions){
           object.reductions.forEach((occ: any)=>{
               const reduction= occ instanceof Reduction? occ :  new Reduction(occ);
               this.reductions.push(reduction);
           });
       }
       if(object.items){
           object.items.forEach((occ: any)=>{
               const item= occ instanceof Item? occ :  new Item(occ);
               this.items.push(item);
           });
       }
this.repayment = (object.repayment instanceof Repayment) ? object.repayment : object.repayment ? new Repayment(object.repayment) : object.repayment;
       if(object.repayedAt){
           this.repayedAt= new Date(object.repayedAt);
       }
       if(object.repaymentProcessedAt){
           this.repaymentProcessedAt= new Date(object.repaymentProcessedAt);
       }
this.avenantType = (object.avenantType instanceof AvenantType) ? object.avenantType : object.avenantType ? new AvenantType(object.avenantType) : object.avenantType;
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
this.item = (object.item instanceof Item) ? object.item : object.item ? new Item(object.item) : object.item;
this.account = (object.account instanceof Account) ? object.account : object.account ? new Account(object.account) : object.account;
       if(object.deletedAt){
           this.deletedAt= new Date(object.deletedAt);
       }
      }
      this.postConstruct()
  }

}

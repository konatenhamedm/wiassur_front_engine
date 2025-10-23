/* eslint-disabled */
import SellCotation from "./SellCotation";
import SellCustomer from "./SellCustomer";
import SellNotes from "./SellNotes";
import SellHandShakeExtend from "@/entity/extends/SellHandShakeExtend";

export default class SellHandShake extends SellHandShakeExtend {

public id = 0;
public type = '';
public category = '';
public quote? = '';
public comment? = '';
public agent? = '';
public manager? = '';
public processed? = '';
public cotations: Array<SellCotation> = [];
public client!: SellCustomer;
public notes: Array<SellNotes> = [];
public title = '';
public uuid? = '';
public createdAt?: Date;
public updatedAt?: Date;
public createBy? = '';
public updateBy? = '';
public removeBy? = '';
public createdFromIp? = '';
public updatedFromIp? = '';

  constructor (object?: any) {
      super(object)
      if(object){
       this.id= object.id;
       this.type= object.type;
       this.category= object.category;
       this.quote= object.quote;
       this.comment= object.comment;
       this.agent= object.agent;
       this.manager= object.manager;
       this.processed= object.processed;
       if(object.cotations){
           object.cotations.forEach((occ: any)=>{
               const sellcotation= occ instanceof SellCotation? occ :  new SellCotation(occ);
               this.cotations.push(sellcotation);
           });
       }
this.client = (object.client instanceof SellCustomer) ? object.client : object.client ? new SellCustomer(object.client) : object.client;
       if(object.notes){
           object.notes.forEach((occ: any)=>{
               const sellnotes= occ instanceof SellNotes? occ :  new SellNotes(occ);
               this.notes.push(sellnotes);
           });
       }
       this.title= object.title;
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
      }
      this.postConstruct()
  }

}

/* eslint-disabled */
import Item from "./Item";
import Avenant from "./Avenant";
import DemandeAttestationExtend from "@/entity/extends/DemandeAttestationExtend";

export default class DemandeAttestation extends DemandeAttestationExtend {

public numero? = '';
public items: Array<Item> = [];
public infos= [];
public status? = '';
public error? = '';
public data= [];
public avenant!: Avenant;
public response= [];
public uuid? = '';
public createdAt? = '';
public updatedAt? = '';
public createBy? = '';
public updateBy? = '';
public removeBy? = '';
public createdFromIp? = '';
public updatedFromIp? = '';
public deletedAt? = '';

  constructor (object?: any) {
      super(object)
      if(object){
       this.numero= object.numero;
       if(object.items){
           object.items.forEach((occ: any)=>{
               const item= occ instanceof Item? occ :  new Item(occ);
               this.items.push(item);
           });
       }
       this.infos= object.infos;
       this.status= object.status;
       this.error= object.error;
       this.data= object.data;
this.avenant = (object.avenant instanceof Avenant) ? object.avenant : object.avenant ? new Avenant(object.avenant) : object.avenant;
       this.response= object.response;
       this.uuid= object.uuid;
       this.createdAt= object.createdAt;
       this.updatedAt= object.updatedAt;
       this.createBy= object.createBy;
       this.updateBy= object.updateBy;
       this.removeBy= object.removeBy;
       this.createdFromIp= object.createdFromIp;
       this.updatedFromIp= object.updatedFromIp;
       this.deletedAt= object.deletedAt;
      }
      this.postConstruct()
  }

}

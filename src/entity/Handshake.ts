/* eslint-disabled */
import Note from "./Note";
import UniqProspect from "./UniqProspect";
import HandshakeExtend from "@/entity/extends/HandshakeExtend";

export default class Handshake extends HandshakeExtend {

public id!: number;
public type = '';
public category = '';
public notes: Array<Note> = [];
public uniqProspect!: UniqProspect;
public title? = '';
public uuid? = '';

public step = '';
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
       if(object.notes){
           object.notes.forEach((occ: any)=>{
               const note= occ instanceof Note? occ :  new Note(occ);
               this.notes.push(note);
           });
       }
this.uniqProspect = (object.uniqProspect instanceof UniqProspect) ? object.uniqProspect : object.uniqProspect ? new UniqProspect(object.uniqProspect) : object.uniqProspect;
       this.title= object.title;
       this.uuid= object.uuid;

       this.step= object.step;
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

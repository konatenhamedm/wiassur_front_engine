/* eslint-disabled */
import ResponseGroup from "./ResponseGroup";
import Handshake from "./Handshake";
import NoteExtend from "@/entity/extends/NoteExtend";

export default class Note extends NoteExtend {

public id!: number;
public comment? = '';
public responseGroup!: ResponseGroup;
public handshake!: Handshake;
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
       this.comment= object.comment;
this.responseGroup = (object.responseGroup instanceof ResponseGroup) ? object.responseGroup : object.responseGroup ? new ResponseGroup(object.responseGroup) : object.responseGroup;
this.handshake = (object.handshake instanceof Handshake) ? object.handshake : object.handshake ? new Handshake(object.handshake) : object.handshake;
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

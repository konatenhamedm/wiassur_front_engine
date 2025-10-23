/* eslint-disabled */
import ChatNoteExtend from "@/entity/extends/ChatNoteExtend";

export default class ChatNote extends ChatNoteExtend {

public id = '';
public content = '';
public uuid? = '';
public createdAt?: Date;
public updatedAt?: Date;
public createBy? = '';
public updateBy? = '';

  constructor (object?: any) {
      super(object)
      if(object){
       this.id= object.id;
       this.content= object.content;
       this.uuid= object.uuid;
       if(object.createdAt){
           this.createdAt= new Date(object.createdAt);
       }
       if(object.updatedAt){
           this.updatedAt= new Date(object.updatedAt);
       }
       this.createBy= object.createBy;
       this.updateBy= object.updateBy;
      }
      this.postConstruct()
  }

}

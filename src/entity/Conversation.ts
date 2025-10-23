/* eslint-disabled */
import Message from "./Message";
import ChatNote from "./ChatNote";
import ConversationExtend from "@/entity/extends/ConversationExtend";

export default class Conversation extends ConversationExtend {

public id = '';
public status? = '';
public type = '';
public question? = '';
public name? = '';
public identifier = '';
public phoneNumber? = '';
public createdAt?: Date;
public messages: Array<Message> = [];
public rgUuid? = '';
public parents? = '';
public lastResponse?: Date;
public maxRememberedMessage? = '';
public lastCheck?: Date;
public manager? = '';
public isAuto? = '';
public partner? = '';
public alias? = '';
public notes: Array<ChatNote> = [];
public recallAt? = '';

  constructor (object?: any) {
      super(object)
      if(object){
       this.id= object.id;
       this.status= object.status;
       this.type= object.type;
       this.question= object.question;
       this.name= object.name;
       this.identifier= object.identifier;
       this.phoneNumber= object.phoneNumber;
       if(object.createdAt){
           this.createdAt= new Date(object.createdAt);
       }
       if(object.messages){
           object.messages.forEach((occ: any)=>{
               const message= occ instanceof Message? occ :  new Message(occ);
               this.messages.push(message);
           });
       }
       this.rgUuid= object.rgUuid;
       this.parents= object.parents;
       if(object.lastResponse){
           this.lastResponse= new Date(object.lastResponse);
       }
       this.maxRememberedMessage= object.maxRememberedMessage;
       if(object.lastCheck){
           this.lastCheck= new Date(object.lastCheck);
       }
       this.manager= object.manager;
       this.isAuto= object.isAuto;
       this.partner= object.partner;
       this.alias= object.alias;
       if(object.notes){
           object.notes.forEach((occ: any)=>{
               const chatnote= occ instanceof ChatNote? occ :  new ChatNote(occ);
               this.notes.push(chatnote);
           });
       }
       this.recallAt= object.recallAt;
      }
      this.postConstruct()
  }

}

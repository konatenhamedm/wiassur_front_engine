/* eslint-disabled */
import EmailTemplate from "./EmailTemplate";
import Item from "./Item";
import Action from "./Action";
import EmailJobExtend from "@/entity/extends/EmailJobExtend";

export default class EmailJob extends EmailJobExtend {

public id!: number;
public recipients= [];
public template!: EmailTemplate;
public data= [];
public status = '';
public item!: Item;
public processedAt?: Date;
public action!: Action;
public uuid? = '';
public createdAt?: Date;
public updatedAt?: Date;

  constructor (object?: any) {
      super(object)
      if(object){
       this.id= object.id;
       this.recipients= object.recipients;
this.template = (object.template instanceof EmailTemplate) ? object.template : object.template ? new EmailTemplate(object.template) : object.template;
       this.data= object.data;
       this.status= object.status;
this.item = (object.item instanceof Item) ? object.item : object.item ? new Item(object.item) : object.item;
       if(object.processedAt){
           this.processedAt= new Date(object.processedAt);
       }
this.action = (object.action instanceof Action) ? object.action : object.action ? new Action(object.action) : object.action;
       this.uuid= object.uuid;
       if(object.createdAt){
           this.createdAt= new Date(object.createdAt);
       }
       if(object.updatedAt){
           this.updatedAt= new Date(object.updatedAt);
       }
      }
      this.postConstruct()
  }

}

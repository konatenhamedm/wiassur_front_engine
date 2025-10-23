/* eslint-disabled */
import SmsTemplate from "./SmsTemplate";
import Item from "./Item";
import Action from "./Action";
import SmsJobExtend from "@/entity/extends/SmsJobExtend";

export default class SmsJob extends SmsJobExtend {

public id!: number;
public recipients= [];
public template!: SmsTemplate;
public item!: Item;
public status = '';
public processedAt?: Date;
public action!: Action;
public data= [];

  constructor (object?: any) {
      super(object)
      if(object){
       this.id= object.id;
       this.recipients= object.recipients;
this.template = (object.template instanceof SmsTemplate) ? object.template : object.template ? new SmsTemplate(object.template) : object.template;
this.item = (object.item instanceof Item) ? object.item : object.item ? new Item(object.item) : object.item;
       this.status= object.status;
       if(object.processedAt){
           this.processedAt= new Date(object.processedAt);
       }
this.action = (object.action instanceof Action) ? object.action : object.action ? new Action(object.action) : object.action;
       this.data= object.data;
      }
      this.postConstruct()
  }

}

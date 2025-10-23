/* eslint-disabled */
import Action from "./Action";
import SubscriptionExtend from "@/entity/extends/SubscriptionExtend";

export default class Subscription extends SubscriptionExtend {

public id = 0;
public data = [];
public nextAction: Array<Action> = [];
public dateLastAction?: Date;

  constructor (object?: any) {
      super(object)
      if(object){
       this.id= object.id;
       this.data= object.data;
       if(object.nextAction){
           object.nextAction.forEach((occ: any)=>{
               const action= occ instanceof Action? occ :  new Action(occ);
               this.nextAction.push(action);
           });
       }
       if(object.dateLastAction){
           this.dateLastAction= new Date(object.dateLastAction);
       }
      }
      this.postConstruct()
  }

}

/* eslint-disabled */
import Action from "./Action";
import Item from "./Item";
import Trigger from "./Trigger";
import CampaignExtend from "@/entity/extends/CampaignExtend";

export default class Campaign extends CampaignExtend {

    public id!: number;
    public name = '';
    public description? = '';
    public code = '';
    public actions: Array<Action> = [];
    public items: Array<Item> = [];
    public triggers: Array<Trigger> = [];

    constructor (object?: any) {
        super(object)
        if(object){
            this.id= object.id;
            this.name= object.name;
            this.description= object.description;
            this.code= object.code;
            if(object.actions){
                object.actions.forEach((occ: any)=>{
                    const action= occ instanceof Action? occ :  new Action(occ);
                    this.actions.push(action);
                });
            }
            if(object.items){
                object.items.forEach((occ: any)=>{
                    const item= occ instanceof Item? occ :  new Item(occ);
                    this.items.push(item);
                });
            }
            if(object.triggers){
                object.triggers.forEach((occ: any)=>{
                    const trigger= occ instanceof Trigger? occ :  new Trigger(occ);
                    this.triggers.push(trigger);
                });
            }
        }
        this.postConstruct()
    }

}

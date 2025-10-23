/* eslint-disabled */
import Action from "./Action";
import WhatsappTemplateExtend from "@/entity/extends/WhatsappTemplateExtend";

export default class WhatsappTemplate extends WhatsappTemplateExtend {

    public id!: number;
    public fid = '';
    public name = '';
    public mappings = [];
    public actions: Array<Action> = [];

    constructor(object?: any) {
        super(object)
        if (object) {
            this.id = object.id;
            this.fid = object.fid;
            this.mappings = object.mappings;
            this.name = object.name
            if (object.actions) {
                object.actions.forEach((occ: any) => {
                    const action = occ instanceof Action ? occ : new Action(occ);
                    this.actions.push(action);
                });
            }
        }
        this.postConstruct()
    }

}

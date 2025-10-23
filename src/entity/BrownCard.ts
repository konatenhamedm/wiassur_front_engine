/* eslint-disabled */
import Insurer from "./Insurer";
import Item from "./Item";
import Partner from "./Partner";
import BrownCardExtend from "@/entity/extends/BrownCardExtend";

export default class BrownCard extends BrownCardExtend {

    public id = '';
    public number = '';
    public insurer!: Insurer;
    public item!: Item;
    public partner!: Partner;
    public at?: Date;
    public assignedBy? = '';
    public uuid? = '';
    public createdAt?: Date;
    public updatedAt?: Date;
    public createBy? = '';
    public updateBy? = '';
    public removeBy? = '';
    public createdFromIp? = '';
    public updatedFromIp? = '';

    constructor(object?: any) {
        super(object)
        if (object) {
            this.id = object.id;
            this.number = object.number;
            this.insurer = (object.insurer instanceof Insurer) ? object.insurer : object.insurer ? new Insurer(object.insurer) : object.insurer;
            this.item = (object.item instanceof Item) ? object.item : object.item ? new Item(object.item) : object.item;
            this.partner = (object.partner instanceof Partner) ? object.partner : object.partner ? new Partner(object.partner) : object.partner;
            if (object.at) {
                this.at = new Date(object.at);
            }
            this.assignedBy = object.assignedBy;
            this.uuid = object.uuid;
            if (object.createdAt) {
                this.createdAt = new Date(object.createdAt);
            }
            if (object.updatedAt) {
                this.updatedAt = new Date(object.updatedAt);
            }
            this.createBy = object.createBy;
            this.updateBy = object.updateBy;
            this.removeBy = object.removeBy;
            this.createdFromIp = object.createdFromIp;
            this.updatedFromIp = object.updatedFromIp;
        }
        this.postConstruct()
    }

}

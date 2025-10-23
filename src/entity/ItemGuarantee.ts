/* eslint-disabled */
import Item from "./Item";
import Guarantee from "./Guarantee";
import ItemGuaranteeExtend from "@/entity/extends/ItemGuaranteeExtend";

export default class ItemGuarantee extends ItemGuaranteeExtend {

    public id!: number;
    public label = '';
    public icon? = '';
    public description? = '';
    public ceiling? = '';
    public deductible? = '';
    public item?: Item;
    public guarantee!: Guarantee;
    public isOptional?: boolean;
    public premium = 0;
    public uuid = '';
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
            this.label = object.label;
            this.icon = object.icon;
            this.description = object.description;
            this.ceiling = object.ceiling;
            this.deductible = object.deductible;
            if (object.item) {
                this.item = (object.item instanceof Item) ? object.item : new Item(object.item);
            }
            if (object.guarantee) {
                this.guarantee = (object.guarantee instanceof Guarantee) ? object.guarantee : new Guarantee(object.guarantee);
            }
            this.isOptional = object.isOptional;
            this.premium = object.premium;
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
    }

}

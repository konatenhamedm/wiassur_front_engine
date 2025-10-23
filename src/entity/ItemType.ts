/* eslint-disabled */
import Branch from "./Branch";
import ItemProperty from "./ItemProperty";
import Item from "./Item";
import ItemTypeExtend from "@/entity/extends/ItemTypeExtend";
import EngineMethod from "@/entity/EngineMethod";

export default class ItemType extends ItemTypeExtend {

    public id!: number;
    public name = '';
    public code = '';
    public icon? = '';
    public branch?: Branch;
    public properties: Array<ItemProperty> = [];
    public className? = '';
    public required?: boolean;
    public isRoot?: boolean;
    public asaciWorkflow? = '';
    public workflow? = '';
    public items: Array<Item> = [];
    public isPackApplier?: boolean;
    public uuid = '';
    public createdAt?: Date;
    public updatedAt?: Date;
    public createBy? = '';
    public updateBy? = '';
    public removeBy? = '';
    public createdFromIp? = '';
    public updatedFromIp? = '';
    public ranking?: number;
    public method?: EngineMethod;

    constructor(object?: any) {
        super(object)
        if (object) {
            this.id = object.id;
            this.name = object.name;
            this.code = object.code;
            this.icon = object.icon;
            if (object.branch) {
                this.branch = (object.branch instanceof Branch) ? object.branch : new Branch(object.branch);
            }
            if (object.properties) {
                object.properties.forEach((occ: any) => {
                    const itemproperty = new ItemProperty(occ);
                    this.properties.push(itemproperty);
                });
            }
            this.asaciWorkflow = object.asaciWorkflow;
            if (object.workflow) {
                this.workflow = object.workflow
            } else if (object.asaciWorkflow) {
                this.workflow = object.asaciWorkflow
            }
            this.className = object.className;
            this.required = object.required;
            this.isRoot = object.isRoot;
            if (object.items) {
                object.items.forEach((occ: any) => {
                    const item = new Item(occ);
                    this.items.push(item);
                });
            }
            this.method = (object.method instanceof EngineMethod) ? object.method : object.method ? new EngineMethod(object.method) : object.method;
            this.isPackApplier = object.isPackApplier;
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
            this.ranking = object.ranking;
        }
    }

}

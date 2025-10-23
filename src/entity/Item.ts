/* eslint-disabled */
import ItemType from "./ItemType";
import Property from "./Property";
import Pack from "./Pack";
import ItemGuarantee from "./ItemGuarantee";
import Contract from "./Contract";
import Avenant from "./Avenant";
import ItemExtend from "@/entity/extends/ItemExtend";
import EngineMethod from "@/entity/EngineMethod";
import {helper} from "@/services/Helper";

export default class Item extends ItemExtend {

    public id!: number;
    public model!: ItemType;
    public properties: Array<Property> = [];
    public parent?: Property;
    public name? = '';
    public pack?: Pack;
    public guarantees: Array<ItemGuarantee> = [];
    public contract?: Contract;
    public defaultAlias? = '';
    public premium?: number;
    public addedAt?: Date;
    public addByAvenant!: Avenant;
    public removeByAvenant?: Avenant;
    public uuid = helper.generateId();
    public createdAt?: Date;
    public updatedAt?: Date;
    public createBy? = '';
    public updateBy? = '';
    public removeBy? = '';
    public createdFromIp? = '';
    public updatedFromIp? = '';
    public details: any[] = []

    public params: any[] = [];
    constructor(object?: any) {
        super(object)
        if (object) {
            this.id = object.id;
            this.model = (object.model instanceof ItemType) ? object.model : object.model ? new ItemType(object.model) : object.model;
            if (object.properties) {
                object.properties.forEach((occ: any) => {
                    const property = occ instanceof Property ? occ : new Property(occ);
                    this.properties.push(property);
                });
            }
            this.details = object.details
            this.parent = (object.parent instanceof Property) ? object.parent : object.parent ? new Property(object.parent) : object.parent;
            this.name = object.name;
            this.pack = (object.pack instanceof Pack) ? object.pack : object.pack ? new Pack(object.pack) : object.pack;
            if (object.guarantees) {
                object.guarantees.forEach((occ: any) => {
                    const itemguarantee = occ instanceof ItemGuarantee ? occ : new ItemGuarantee(occ);
                    this.guarantees.push(itemguarantee);
                });
            }
            this.contract = (object.contract instanceof Contract) ? object.contract : object.contract ? new Contract(object.contract) : object.contract;
            this.defaultAlias = object.defaultAlias;
            this.premium = object.premium;
            if (object.addedAt) {
                this.addedAt = new Date(object.addedAt);
            }

            this.addByAvenant = (object.addByAvenant instanceof Avenant) ? object.addByAvenant : object.addByAvenant ? new Avenant(object.addByAvenant) : object.addByAvenant;
            this.removeByAvenant = (object.removeByAvenant instanceof Avenant) ? object.removeByAvenant : object.removeByAvenant ? new Avenant(object.removeByAvenant) : object.removeByAvenant;
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

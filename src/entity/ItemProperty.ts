/* eslint-disabled */
import ItemType from "./ItemType";
import Property from "./Property";
import PropertyChoice from "./PropertyChoice";
import ConditionGroup from "./ConditionGroup";
import ItemPropertyExtend from "@/entity/extends/ItemPropertyExtend";

export default class ItemProperty extends ItemPropertyExtend {

    public id!: number;
    public name = '';
    public code = '';
    public value?= '';
    public link?= '';
    public identifier?: boolean;
    public item!: ItemType;
    public required?: boolean;
    public min?: number;
    public max?: number;
    public editable?: boolean;
    public occurences: Array<Property> = [];
    public ranking?: number;
    public choices: Array<PropertyChoice> = [];
    public isAlias?: boolean;
    public showOnDevis?: boolean;
    public workflow? = '';
    public resetForEachAvenant?: boolean;
    public visible?: boolean;
    public conditionGroups: Array<ConditionGroup> = [];
    public uuid = '';
    public createdAt?: Date;
    public updatedAt?: Date;
    public createBy?= '';
    public updateBy?= '';
    public removeBy?= '';
    public createdFromIp?= '';
    public updatedFromIp?= '';

    constructor(object?: any) {
        super(object)
        if (object) {
            // console.log('received')
            // console.log(object)

            this.id = object.id;
            this.name = object.name;
            this.code = object.code;
            this.value = object.value;
            this.link = object.link;
            this.identifier = object.identifier;
            this.item = (object.item instanceof ItemType) ? object.item : object.item ? new ItemType(object.item) : object.item;
            this.required = object.required;
            this.min = object.min;
            this.max = object.max;
            this.editable = object.editable;
            if (object.occurences) {
                object.occurences.forEach((occ: any) => {
                    const property = occ instanceof Property ? occ : new Property(occ);
                    this.occurences.push(property);
                });
            }
            this.ranking = object.ranking;
            if (object.choices) {
                object.choices.forEach((occ: any) => {
                    const propertychoice = occ instanceof PropertyChoice ? occ : new PropertyChoice(occ);
                    this.choices.push(propertychoice);
                });
            }
            this.isAlias = object.isAlias;
            this.showOnDevis = object.showOnDevis;
            this.visible = object.visible;
            if (object.conditionGroups) {
                object.conditionGroups.forEach((occ: any) => {
                    const conditiongroup = occ instanceof ConditionGroup ? occ : new ConditionGroup(occ);
                    this.conditionGroups.push(conditiongroup);
                });
            }
            this.uuid = object.uuid;
            if (object.createdAt) {
                this.createdAt = new Date(object.createdAt);
            }
            if (object.updatedAt) {
                this.updatedAt = new Date(object.updatedAt);
            }
            this.resetForEachAvenant= object.resetForEachAvenant;
            this.workflow= object.workflow;
            this.createBy = object.createBy;
            this.updateBy = object.updateBy;
            this.removeBy = object.removeBy;
            this.createdFromIp = object.createdFromIp;
            this.updatedFromIp = object.updatedFromIp;
        }
        this.postConstruct()
        // console.log(this.type)
    }

}

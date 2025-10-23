/* eslint-disabled */
import ItemProperty from "./ItemProperty";
import PropertyCondition from "./PropertyCondition";
import ConditionGroupExtend from "@/entity/extends/ConditionGroupExtend";

export default class ConditionGroup extends ConditionGroupExtend {

    public id!: number;
    public property!: ItemProperty;
    public conditions: Array<PropertyCondition> = [];

    constructor(object?: any) {
        super(object)
        if (object) {
            this.id = object.id;
            this.property = (object.property instanceof ItemProperty) ? object.property : object.property ? new ItemProperty(object.property) : object.property;
            if (object.conditions) {
                object.conditions.forEach((occ: any) => {
                    const propertycondition = occ instanceof PropertyCondition ? occ : new PropertyCondition(occ);
                    this.conditions.push(propertycondition);
                });
            }
        }
        this.postConstruct()
    }



}

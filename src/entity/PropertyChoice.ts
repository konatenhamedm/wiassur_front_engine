/* eslint-disabled */
import ItemProperty from "./ItemProperty";
import PropertyChoiceExtend from "@/entity/extends/PropertyChoiceExtend";

export default class PropertyChoice extends PropertyChoiceExtend {

    public id!: number;
    public label = '';
    public code = '';
    public icon? = '';
    public property?: ItemProperty;
    public description = ''

    constructor(object?: any) {
        super(object)
        if (object) {
            this.id = object.id;
            this.label = object.label;
            this.code = object.code;
            this.description = object.description;
            this.icon = object.icon;
            if (object.property) {
                this.property = (object.property instanceof ItemProperty) ? object.property : new ItemProperty(object.property);
            }
        }
    }

}

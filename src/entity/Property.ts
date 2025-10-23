/* eslint-disabled */
import ItemProperty from "./ItemProperty";
import Item from "./Item";
import PropertyExtend from "@/entity/extends/PropertyExtend";
import store from "@/store";

export default class Property extends PropertyExtend {

    public id!: number;
    public model!: ItemProperty;
    public value? = '';

    constructor(object?: any) {
        super(object)
        if (object) {
            this.id = object.id;
            this.model = (object.model instanceof ItemProperty) ? object.model : new ItemProperty(object.model);
            this.name = this.model.name
            this.value = object.value;
        }

        this.postConstruct()
    }


}

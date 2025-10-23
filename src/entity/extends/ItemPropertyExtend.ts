/* eslint-disabled */

import DataType from "@/entity/DataType";
import QuestionType from "@/entity/QuestionType";
import ItemProperty from "@/entity/ItemProperty";
import Item from '../Item';

export default class ItemPropertyExtend {

    public type!: DataType;
    public mapped = false
    public entity: any = null

    constructor(object?: any) {
        if (object) {
            this.entity = object.entity
            this.type = object.type
        }

    }

    postConstruct() {
        const self: ItemProperty = this as any
        if (self.type) {
            this.type = (self.type instanceof DataType) ? self.type : new DataType(self.type);
        }
    }

    isVisibleIn(items: Item[]) {


        return true
    }

}

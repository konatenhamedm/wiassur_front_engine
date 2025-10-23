/* eslint-disabled */

import DataType from "@/entity/DataType";
import store from "@/store";
import ItemType from "@/entity/ItemType";
import {helper} from "@/services/Helper";
import EngineArgument from "@/entity/EngineArgument";

export default class EngineArgumentExtend {


    allowed = false
    public type!: DataType
    public itemType?: ItemType;
    public requirement?: number
    public resultOfLine?: string
    public source: any[] = []
    public link = ''
    public from = ''

    constructor(object?: any) {
        if (object) {
            if (typeof object.type === 'object') {
                this.type = (object.type instanceof DataType) ? object.type : new DataType(object.type);
            } else if (typeof object.type === 'number') {
                this.type = store.state.dataTypes.find((i: DataType) => {
                    return i.id === object.type
                })
            }
            this.link = object.link
            this.source = object.source
            this.itemType = (object.itemType instanceof ItemType) ? object.itemType : object.itemType ? new ItemType(object.itemType) : object.itemType;
            this.requirement = object.requirement
            this.resultOfLine = object.resultOfLine

        }

    }


    get variableCode() {
        const self: EngineArgument = this as any
        // console.log('var '+self.name)
        // console.log(self)
        let code: any = ''

        if (self.type.code === 'CALLABLE' && self.value) {
            // console.log(self)
            return 'this.' + self.code
        } else if (self.type.format === 'NUMBER' && self.value) {
            code = parseFloat(self.value)
            return code
        } else if (!helper.empty(self.alias)) {
            code = helper.slugify(self.alias, '_')
            // return code
        } else {
            code = helper.slugify(self.name, '_')
        }
        let itemCode = ''
        if (self.itemType) {
            itemCode = self.itemType.code + '.'
        }

        code = itemCode + code.toLowerCase()
        return code
    }

    postConstruct() {
        const self: EngineArgument = this as any
        if (helper.empty(self.code)) {
            self.code = helper.slugify(self.name, '_').toLowerCase()
        }
    }
}

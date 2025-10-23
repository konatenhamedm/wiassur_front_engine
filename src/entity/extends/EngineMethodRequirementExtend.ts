/* eslint-disabled */

import DataType from "@/entity/DataType";
import EngineMethodRequirement from "@/entity/EngineMethodRequirement";

export default class EngineMethodRequirementExtend {


    type!: DataType

    constructor(object?: any) {
        if (object) {
            this.type = new DataType(object.type)
        }
    }

    postConstruct() {
        const self: EngineMethodRequirement = this as any
        if (self.itemType) {
            self.itemType.expand = false
        }
    }
}

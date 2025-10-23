/* eslint-disabled */

import PackCategoryGuarantee from "@/entity/PackCategoryGuarantee";

export default class PackCategoryGuaranteeExtend {


    selected = false

    constructor(object?: any) {
    }

    postConstruct() {
    }

    get label() {
        const self: PackCategoryGuarantee = this as any
        if (self.guarantee) {
            return self.guarantee.label
        }
        return null
    }
}

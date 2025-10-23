/* eslint-disabled */

import PackCategoryGuarantee from "@/entity/PackCategoryGuarantee";

export default class PackGuaranteeExtend {


    constructor(object?: any) {
    }

    get label() {
        const self: PackCategoryGuarantee = this as any
        if (self.guarantee) {
            return self.guarantee.label
        }
        return null
    }
}

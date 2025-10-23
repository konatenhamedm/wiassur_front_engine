/* eslint-disabled */

export default class PremiumDetailModelExtend {

    edit = false
    value = 0
    deletedAt = null
    branchId: any = null

    constructor(object?: any) {
        if (object) {
            this.deletedAt = object.deletedAt
            this.branchId = object.branchId
        }
    }

    postConstruct() {
    }
}

/* eslint-disabled */

export default class RepaymentExtend {

    avenantCount = 0

    constructor(object?: any) {
        if (object) {
            this.avenantCount = object.avenantCount
        }
    }

    postConstruct() {
    }
}

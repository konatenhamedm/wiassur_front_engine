/* eslint-disabled */

import PaymentTransaction from "@/entity/PaymentTransaction";

export default class AccountOperationExtend {

    public transaction!: PaymentTransaction;

    constructor(object?: any) {
        if (object) {
            this.transaction = object.transaction
        }
    }

    postConstruct() {
    }
}

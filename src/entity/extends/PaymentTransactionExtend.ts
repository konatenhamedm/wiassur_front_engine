/* eslint-disabled */

export default class PaymentTransactionExtend {

    avenant: any = null
    amount = 0
    contractUuid = ''
    contractNumber = ''

    avenantUuid = ''
    avenantNumber = ''

    customerUuid = ''
    customerFullname = ''

    partner = ''

    constructor(object?: any) {
        if (object) {
            this.avenant = object.avenant
            this.contractUuid = object.contractUuid
            this.contractNumber = object.contractNumber
            this.amount = object.premium;
            this.avenantUuid = object.avenantUuid
            this.avenantNumber = object.avenantNumber

            this.customerUuid = object.customerUuid
            this.customerFullname = object.customerFullname

            this.partner = object.partner

        }
    }

    postConstruct() {
    }
}

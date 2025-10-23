/* eslint-disabled */

export default class ContractExtend {

    balance = 0
    previousContractUuid: any = null
    nextContractUuid: any = null
    renewLink: any = null
    assetLabels: any[] = []

    constructor(object?: any) {
        if (object) {
            this.balance = object.balance
            this.previousContractUuid = object.previousContractUuid
            this.nextContractUuid = object.nextContractUuid
            this.renewLink = object.renewLink
            this.assetLabels = object.assetLabels
        }
    }

    postConstruct() {
    }
}

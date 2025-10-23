/* eslint-disabled */

import ItemType from "@/entity/ItemType";
import Account from "@/entity/Account";
import Avenant from "@/entity/Avenant";
import Customer from '@/entity/Customer';
import AccountOperation from '../AccountOperation';
import Partner from "@/entity/Partner";

export default class AvenantExtend {


    account!: Account
    ins: string[] = []
    outs: string[] = []
    branch = ''
    // police = ''
    customer!: Customer
    paymentAmount = 0
    assetLabels: any[] = []
    assetIdentifiers: any[] = []
    balance = 0
    invoicesBalance = 0
    count = 0
    contractUuid = ''
    itemUuid = ''
    details: any[] = []
    partner?: Partner

    constructor(object?: any) {
        const self: Avenant = this as any
        if (object) {
            this.balance = object.balance
            if (object.account) {
                this.account = (object.account instanceof Account) ? object.account : new Account(object.account);
            }
            this.invoicesBalance = object.invoicesBalance
            if (object.ins) {
                this.ins = object.ins
            }
            this.itemUuid = object.itemUuid
            this.assetLabels = object.assetLabels
            this.assetIdentifiers = object.assetIdentifiers
            this.customer = new Customer(object.customer)
            this.details = object.details;
            if (object.outs) {
                this.outs = object.outs
            }
            this.branch = object.branch
            // this.police = object.police
            this.count = object.count
            this.contractUuid = object.contractUuid
            this.partner = object.partner
            if (object.partner) {
                this.partner = (object.partner instanceof Partner) ? object.partner : new Partner(object.partner);
            }

            // console.log(object)
            // console.log(this)
        }
    }

    get amountPayed() {
        let sum = 0
        this.account.operations.forEach((o: AccountOperation) => {
            sum += o.transaction.amount
        })

        return Math.round(sum)
    }


    postConstruct() {

    }


}

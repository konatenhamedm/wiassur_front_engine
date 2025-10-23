/* eslint-disabled */

import Prospect from "@/entity/Prospect";
import Order from "@/entity/Order";

export default class OrderExtend {

    endAt!: Date
    number = ''
    files = []
    loaded = false
    branch = ''
    userData = {}
    partner = ''
    public prospect?: Prospect;
    deadlines: any[] = []

    constructor(object?: any) {
        if (object) {
            this.endAt = new Date(object.endAt)
            this.number = object.number
            this.partner = object.partner
            this.prospect = (object.prospect instanceof Prospect) ? object.prospect : new Prospect(object.prospect);
            this.files = object.files ? object.files : []
            this.branch = object.branch
            this.deadlines = object.deadlines
            this.files.forEach((f: any) => {
                f.loaded = false
            })
        }
    }

    hasReduction() {
        const self: Order = this as any
        let total = 0
        for (let reduction of self.reductions) {
            if (reduction.premium > 0) {
                return true
            }
        }
        return false
    }

    getReductionsPremium() {
        const self: Order = this as any
        let total = 0
        for (let reduction of self.reductions) {
            if (reduction.premium > 0) {
                total += reduction.premium;
            }
        }
        return total
    }

    postConstruct() {
    }
}

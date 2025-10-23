/* eslint-disabled */

import Guarantee from "@/entity/Guarantee";
import Pack from "@/entity/Pack";
import PackGuarantee from "@/entity/PackGuarantee";

export default class PackExtend {


    branchSlug = ''

    constructor(object?: any) {
        if (object) {
            this.branchSlug = object.branchSlug
        }
    }

    hasGuarantee(guarantee: Guarantee) {
        const self: Pack = this as any
        let match: any = false
        self.packGuarantees.forEach((pg: PackGuarantee) => {
            if (pg.guarantee && pg.guarantee.id === guarantee.id) {
                match = pg
            }
        })
        return match;
    }



    hasMandatoryGuarantee(guarantee: Guarantee) {
        const self: Pack = this as any
        let match: any = false
        self.packGuarantees.forEach((pg: PackGuarantee) => {
            if (pg.guarantee && pg.guarantee.id === guarantee.id && pg.isOptional === false) {
                match = pg
            }
        })
        return match;
    }

    hasOptionalGuarantee(guarantee: Guarantee) {
        const self: Pack = this as any
        let match: any = false
        self.packGuarantees.forEach((pg: PackGuarantee) => {
            if (pg.guarantee && pg.guarantee.id === guarantee.id && pg.isOptional === true) {
                match = pg
            }
        })
        return match;
    }

    isGuaranteeMandatory(guarantee: Guarantee) {
        const self: Pack = this as any
        let match: any = false
        self.packGuarantees.forEach((pg: PackGuarantee) => {
            if (pg.guarantee && pg.guarantee.id === guarantee.id && !pg.isOptional) {
                match = pg
            }
        })
        return match;
    }


}

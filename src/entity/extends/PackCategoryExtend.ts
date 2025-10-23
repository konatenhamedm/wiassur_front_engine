/* eslint-disabled */

import Guarantee from "@/entity/Guarantee";
import Pack from "@/entity/Pack";
import PackGuarantee from "@/entity/PackGuarantee";
import PackCategory from "@/entity/PackCategory";
import PackCategoryGuarantee from "@/entity/PackCategoryGuarantee";

export default class PackCategoryExtend {


    constructor(object?: any) {
    }

    postConstruct() {
    }


    hasGuarantee(guarantee: Guarantee) {
        const self: PackCategory = this as any
        let match: any = false
        for (let pcg of self.packCategoryGuarantees) {
            if (pcg.guarantee.id === guarantee.id) {
                return true
            }
        }
        return false;
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
    isOptionalSelected(guarantee:Guarantee){
        const self: PackCategory = this as any
        let match: any = false
        for (let pcg of self.packCategoryGuarantees) {
            if (pcg.guarantee && pcg.guarantee.id === guarantee.id) {
                if (pcg.selected) {
                    return true;
                }
                return false;
            }
        }
        return false;
    }

    isGuaranteeMandatory(guarantee: Guarantee) {
        const self: PackCategory = this as any
        let match: any = false
        for (let pcg of self.packCategoryGuarantees) {
            if (pcg.guarantee && pcg.guarantee.id === guarantee.id) {
                if (pcg.optional) {
                    return false;
                }
                return true;
            }
        }
        return false;
    }
}

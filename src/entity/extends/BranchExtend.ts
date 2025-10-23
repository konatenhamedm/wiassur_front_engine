/* eslint-disabled */

import Avenant from "@/entity/Avenant";
import PremiumDetailModel from "@/entity/PremiumDetailModel";
import Branch from "@/entity/Branch";
import ReductionModel from "@/entity/ReductionModel";

export default class BranchExtend {


    public categoryLabel = ''
    public categorySlug = ''
    public engineVersion = null
    public avenants: Avenant[] = []
    emmissionTTCGlobale = 0
    emmissionNetteGlobale = 0
    avenantCount = 0
    commissionCount = 0
    commissions = 0
    public premiumDetailModels: Array<PremiumDetailModel> = [];
    public reductionModels: Array<ReductionModel> = [];

    constructor(object?: any) {
        const self: Branch = this as any
        if (object) {
            this.engineVersion = object.engineVersion
            this.categorySlug = object.categorySlug
            this.categoryLabel = object.categoryLabel
        }
    }

    postConstruct() {

    }

}

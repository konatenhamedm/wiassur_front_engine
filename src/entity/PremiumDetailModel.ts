/* eslint-disabled */
import Branch from "./Branch";
import PremiumDetail from "./PremiumDetail";
import EngineMethod from "./EngineMethod";
import PremiumDetailModelExtend from "@/entity/extends/PremiumDetailModelExtend";

export default class PremiumDetailModel extends PremiumDetailModelExtend {

    public id!: number;
    public label = '';
    public operator? = '';
    public branch!: Branch;
    public premiumDetails: Array<PremiumDetail> = [];
    public method?: EngineMethod;
    public ranking?: number;
    public code: string = ''
    public isReduction = false
    public isEnabled = true

    constructor(object?: any) {
        super(object)
        if (object) {
            this.id = object.id;
            this.label = object.label;
            this.isReduction = object.isReduction;
            this.operator = object.operator;
            this.code = object.code;
            this.isEnabled = object.isEnabled;
            this.branch = (object.branch instanceof Branch) ? object.branch : object.branch ? new Branch(object.branch) : object.branch;
            if (object.premiumDetails) {
                object.premiumDetails.forEach((occ: any) => {
                    const premiumdetail = occ instanceof PremiumDetail ? occ : new PremiumDetail(occ);
                    this.premiumDetails.push(premiumdetail);
                });
            }
            this.method = (object.method instanceof EngineMethod) ? object.method : object.method ? new EngineMethod(object.method) : object.method;
            this.ranking = object.ranking;
        }
        this.postConstruct()
    }
}

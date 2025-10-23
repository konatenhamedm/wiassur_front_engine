/* eslint-disabled */
import Branch from "./Branch";
import Commission from "./Commission";
import EngineMethod from "./EngineMethod";
import CommissionModelExtend from "@/entity/extends/CommissionModelExtend";

export default class CommissionModel extends CommissionModelExtend {

    public id!: number;
    public label = '';
    public code = '';
    public branch!: Branch;
    public isEnable!: boolean;
    public commissions: Array<Commission> = [];
    public method!: EngineMethod;
    public showOnSlip?: boolean;
    public deletedAt?: Date;
    public ranking?: number;

    constructor(object?: any) {
        super(object)
        if (object) {
            this.id = object.id;
            this.label = object.label;
            this.code = object.code;
            this.branch = (object.branch instanceof Branch) ? object.branch : object.branch ? new Branch(object.branch) : object.branch;
            this.isEnable = object.isEnable;
            if (object.commissions) {
                object.commissions.forEach((occ: any) => {
                    const commission = occ instanceof Commission ? occ : new Commission(occ);
                    this.commissions.push(commission);
                });
            }
            this.method = (object.method instanceof EngineMethod) ? object.method : object.method ? new EngineMethod(object.method) : object.method;
            this.showOnSlip = object.showOnSlip;
            if (object.deletedAt) {
                this.deletedAt = new Date(object.deletedAt);
            }
            this.ranking = object.ranking;
        }
        this.postConstruct()
    }

}

/* eslint-disabled */
import Guarantee from "./Guarantee";
import Pack from "./Pack";
import PackGuaranteeExtend from "@/entity/extends/PackGuaranteeExtend";

export default class PackGuarantee extends PackGuaranteeExtend {

    public id!: number;
    public guarantee!: Guarantee;
    public ceiling? = '';
    public deductible? = '';
    public pack?: Pack;
    public isOptional?: boolean;
    public ranking?: number;
    public selected = false

    constructor(object?: any) {
        super(object)
        if (object) {
            this.id = object.id;
            if (object.guarantee) {
                this.guarantee = (object.guarantee instanceof Guarantee) ? object.guarantee : new Guarantee(object.guarantee);
            }
            this.selected = object.selected
            this.ceiling = object.ceiling;
            this.deductible = object.deductible;
            if (object.pack) {
                this.pack = (object.pack instanceof Pack) ? object.pack : new Pack(object.pack);
            }
            this.isOptional = object.isOptional;
            this.ranking = object.ranking;
        }
    }



}

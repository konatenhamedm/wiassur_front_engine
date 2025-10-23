/* eslint-disabled */
import PackCategory from "./PackCategory";
import Guarantee from "./Guarantee";
import PackCategoryGuaranteeExtend from "@/entity/extends/PackCategoryGuaranteeExtend";

export default class PackCategoryGuarantee extends PackCategoryGuaranteeExtend {

    public id!: number;
    public category!: PackCategory;
    public guarantee!: Guarantee;
    public optional?: boolean = false;
    public ranking!: number;

    constructor(object?: any) {
        super(object)
        if (object) {
            this.id = object.id;
            this.category = (object.category instanceof PackCategory) ? object.category : object.category ? new PackCategory(object.category) : object.category;
            this.guarantee = (object.guarantee instanceof Guarantee) ? object.guarantee : object.guarantee ? new Guarantee(object.guarantee) : object.guarantee;
            this.optional = object.optional;
            this.ranking = object.ranking;
        }
        this.postConstruct()
    }

}

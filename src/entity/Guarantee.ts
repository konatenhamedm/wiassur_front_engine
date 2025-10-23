/* eslint-disabled */
import Branch from "./Branch";
import PackGuarantee from "./PackGuarantee";
import ItemGuarantee from "./ItemGuarantee";
import EngineMethod from "./EngineMethod";
import PackCategoryGuarantee from "./PackCategoryGuarantee";
import GuaranteeExtend from "@/entity/extends/GuaranteeExtend";

export default class Guarantee extends GuaranteeExtend {

    public id!: number;
    public label = '';
    public icon? = '';
    public description? = '';
    public enabled?: true;
    public branch!: Branch;
    public packGuarantees: Array<PackGuarantee> = [];
    public itemGuarantees: Array<ItemGuarantee> = [];
    public method!: EngineMethod;
    public rawMethod!: EngineMethod;
    public packCategoryGuarantees: Array<PackCategoryGuarantee> = [];
    public photo? = '';
    public alt? = '';
    public ranking?: number;

    constructor(object?: any) {
        super(object)
        if (object) {
            this.id = object.id;
            this.label = object.label;
            this.icon = object.icon;
            this.description = object.description;
            this.enabled = object.enabled;
            this.branch = (object.branch instanceof Branch) ? object.branch : object.branch ? new Branch(object.branch) : object.branch;
            if (object.packGuarantees) {
                object.packGuarantees.forEach((occ: any) => {
                    const packguarantee = occ instanceof PackGuarantee ? occ : new PackGuarantee(occ);
                    this.packGuarantees.push(packguarantee);
                });
            }
            if (object.itemGuarantees) {
                object.itemGuarantees.forEach((occ: any) => {
                    const itemguarantee = occ instanceof ItemGuarantee ? occ : new ItemGuarantee(occ);
                    this.itemGuarantees.push(itemguarantee);
                });
            }
            this.method = (object.method instanceof EngineMethod) ? object.method : object.method ? new EngineMethod(object.method) : object.method;
            this.rawMethod = (object.rawMethod instanceof EngineMethod) ? object.rawMethod : object.rawMethod ? new EngineMethod(object.rawMethod) : object.rawMethod;
            if (object.packCategoryGuarantees) {
                object.packCategoryGuarantees.forEach((occ: any) => {
                    const packcategoryguarantee = occ instanceof PackCategoryGuarantee ? occ : new PackCategoryGuarantee(occ);
                    this.packCategoryGuarantees.push(packcategoryguarantee);
                });
            }
            this.photo = object.photo;
            this.alt = object.alt;
            this.ranking = object.ranking;
        }
        this.postConstruct()
    }

}

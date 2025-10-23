/* eslint-disabled */
import Branch from "./Branch";
import Pack from "./Pack";
import PackCategoryGuarantee from "./PackCategoryGuarantee";
import ItemType from "./ItemType";
import PackCategoryExtend from "@/entity/extends/PackCategoryExtend";

export default class PackCategory extends PackCategoryExtend {

    public id!: number;
    public label = '';
    public slug = '';
    public description? = '';
    public branch!: Branch;
    public ranking?: number;
    public packs: Array<Pack> = [];
    public enabled?: false;
    public packCategoryGuarantees: Array<PackCategoryGuarantee> = [];
    public itemType!: ItemType;
    public uuid? = '';
    public createdAt?: Date;
    public updatedAt?: Date;
    public createBy? = '';
    public updateBy? = '';
    public removeBy? = '';
    public createdFromIp? = '';
    public updatedFromIp? = '';

    constructor(object?: any) {
        super(object)
        if (object) {
            this.id = object.id;
            this.label = object.label;
            this.slug = object.slug;
            this.description = object.description;
            this.branch = (object.branch instanceof Branch) ? object.branch : object.branch ? new Branch(object.branch) : object.branch;
            this.ranking = object.ranking;
            if (object.packs) {
                object.packs.forEach((occ: any) => {
                    const pack = occ instanceof Pack ? occ : new Pack(occ);
                    this.packs.push(pack);
                });
            }
            this.enabled = object.enabled;
            if (object.packCategoryGuarantees) {
                object.packCategoryGuarantees.forEach((occ: any) => {
                    const packcategoryguarantee = occ instanceof PackCategoryGuarantee ? occ : new PackCategoryGuarantee(occ);
                    this.packCategoryGuarantees.push(packcategoryguarantee);
                });
            }
            this.itemType = (object.itemType instanceof ItemType) ? object.itemType : object.itemType ? new ItemType(object.itemType) : object.itemType;
            this.uuid = object.uuid;
            if (object.createdAt) {
                this.createdAt = new Date(object.createdAt);
            }
            if (object.updatedAt) {
                this.updatedAt = new Date(object.updatedAt);
            }
            this.createBy = object.createBy;
            this.updateBy = object.updateBy;
            this.removeBy = object.removeBy;
            this.createdFromIp = object.createdFromIp;
            this.updatedFromIp = object.updatedFromIp;
        }
        this.postConstruct()
    }

}

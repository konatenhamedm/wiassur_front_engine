/* eslint-disabled */
import Insurer from "./Insurer";
import PackCategory from "./PackCategory";
import PackGuarantee from "./PackGuarantee";
import PackFile from "./PackFile";
import PackExtend from "@/entity/extends/PackExtend";

export default class Pack extends PackExtend {

    public id!: number;
    public uuid!: number;
    public label = '';
    public insurer?: Insurer;
    public code = ''
    public category?: PackCategory;
    public enable?: boolean;
    public packGuarantees: Array<PackGuarantee> = [];
    public files: Array<PackFile> = [];

    constructor(object?: any) {
        super(object)
        if (object) {
            this.id = object.id;
            this.uuid = object.uuid;
            this.label = object.label;
            this.code = object.code
            if (object.insurer) {
                this.insurer = (object.insurer instanceof Insurer) ? object.insurer : new Insurer(object.insurer);
            }
            if (object.category) {
                this.category = (object.category instanceof PackCategory) ? object.category : new PackCategory(object.category);
            }
            this.enable = object.enable;
            if (object.packGuarantees) {
                object.packGuarantees.forEach((occ: any) => {
                    const packguarantee = new PackGuarantee(occ);
                    this.packGuarantees.push(packguarantee);
                });
            }
            if (object.files) {
                object.files.forEach((occ: any) => {
                    const packfile = new PackFile(occ);
                    this.files.push(packfile);
                });
            }
        }
    }

}

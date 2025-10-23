/* eslint-disabled */
import Branch from "./Branch";
import EngineMethod from "./EngineMethod";
import EngineExtend from "@/entity/extends/EngineExtend";

export default class Engine extends EngineExtend {

    public id!: number;
    public branch!: Branch;
    public methods: Array<EngineMethod> = [];
    public name = '';
    public description?= '';
    public version!: number;
    public active?: boolean;
    public uuid?= '';
    public createdAt?: Date;
    public updatedAt?: Date;
    public createBy?= '';
    public updateBy?= '';
    public removeBy?= '';
    public createdFromIp?= '';
    public updatedFromIp?= '';

    constructor(object?: any) {
        super(object)
        if (object) {
            this.id = object.id;
            this.branch = (object.branch instanceof Branch) ? object.branch : object.branch ? new Branch(object.branch) : object.branch;
            if (object.methods) {
                object.methods.forEach((occ: any) => {
                    const enginemethod = occ instanceof EngineMethod ? occ : new EngineMethod(occ);
                    this.methods.push(enginemethod);
                });
            }
            this.name = object.name;
            this.description = object.description;
            this.version = object.version;
            this.active = object.active;
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

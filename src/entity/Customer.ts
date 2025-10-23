/* eslint-disabled */
import Enterprise from "./Enterprise";
import CustomerExtend from "@/entity/extends/CustomerExtend";
import Parrainage from "@/entity/Parrainage";

export default class Customer extends CustomerExtend {

    public id!: number;
    public name? = '';
    // @ts-ignore
    public email? = '';
    public prename? = '';
    public active!: boolean;
    public employer?: Enterprise;
    public civility? = '';
    public fonction? = '';
    public enterprise?: Enterprise;
    // @ts-ignore
    public mobile? = '';
    // @ts-ignore
    public fixe? = '';
    public blocked = true;
    public idNumber? = '';
    public photo? = '';
    public alt? = '';
    public uuid = '';
    public source = '';
    public createdAt?: Date;
    public updatedAt?: Date;
    public createBy? = '';
    public updateBy? = '';
    public removeBy? = '';
    public createdFromIp? = '';
    public updatedFromIp? = '';
    public deletedAt?: Date;
    public parrainages: Array<Parrainage> = [];
    public affiliation?: Parrainage;

    constructor(object?: any) {
        super(object)
        if (object) {
            this.id = object.id;
            this.name = object.name;
            this.email = object.email;
            this.prename = object.prename;
            this.active = object.active;
            this.source = object.source;
            this.blocked = object.blocked;
            this.employer = (object.employer instanceof Enterprise) ? object.employer : new Enterprise(object.employer);
            this.civility = object.civility;
            this.fonction = object.fonction;
            this.enterprise = (object.enterprise instanceof Enterprise) ? object.enterprise : new Enterprise(object.enterprise);
            this.mobile = object.mobile;
            this.fixe = object.fixe;
            this.idNumber = object.idNumber;
            this.photo = object.photo;
            this.alt = object.alt;
            this.uuid = object.uuid;
            if (object.createdAt) {
                this.createdAt = new Date(object.createdAt);
            }
            if (object.updatedAt) {
                this.updatedAt = new Date(object.updatedAt);
            }
            if (object.parrainages) {
                object.parrainages.forEach((occ: any) => {
                    const parrainage = occ instanceof Parrainage ? occ : new Parrainage(occ);
                    this.parrainages.push(parrainage);
                });
            }
            this.affiliation = (object.affiliation instanceof Parrainage) ? object.affiliation : object.affiliation ? new Parrainage(object.affiliation) : object.affiliation;

            this.createBy = object.createBy;
            this.updateBy = object.updateBy;
            this.removeBy = object.removeBy;
            this.createdFromIp = object.createdFromIp;
            this.updatedFromIp = object.updatedFromIp;
            if (object.deletedAt) {
                this.deletedAt = new Date(object.deletedAt);
            }
        }
        this.postConstruct()
    }

}

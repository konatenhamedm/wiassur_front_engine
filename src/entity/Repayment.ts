/* eslint-disabled */
import Insurer from "./Insurer";
import Avenant from "./Avenant";
import Account from "./Account";
import RepaymentExtend from "@/entity/extends/RepaymentExtend";

export default class Repayment extends RepaymentExtend {

    public id!: number;
    public amount!: number;
    public insurer!: Insurer;
    public avenants: Array<Avenant> = [];
    public status = '';
    public processingStep? = '';
    public processingPage?: number;
    public processingAvenant? = '';
    public commissions = [];
    public reductions = [];
    public uuid? = '';
    public createdAt?: Date;
    public updatedAt?: Date;
    public createBy? = '';
    public updateBy? = '';
    public removeBy? = '';
    public createdFromIp? = '';
    public updatedFromIp? = '';
    public account!: Account;

    constructor(object?: any) {
        super(object)
        if (object) {
            this.id = object.id;
            this.amount = object.amount;
            this.insurer = (object.insurer instanceof Insurer) ? object.insurer : object.insurer ? new Insurer(object.insurer) : object.insurer;
            if (object.avenants) {
                object.avenants.forEach((occ: any) => {
                    const avenant = occ instanceof Avenant ? occ : new Avenant(occ);
                    this.avenants.push(avenant);
                });
            }
            this.status = object.status;
            this.processingStep = object.processingStep;
            this.processingPage = object.processingPage;
            this.processingAvenant = object.processingAvenant;
            this.commissions = object.commissions;
            this.reductions = object.reductions;
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
            this.account = (object.account instanceof Account) ? object.account : object.account ? new Account(object.account) : object.account;
        }
        this.postConstruct()
    }

}

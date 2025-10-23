/* eslint-disabled */
import Customer from "./Customer";
import Branch from "./Branch";
import Avenant from "./Avenant";
import Item from "./Item";
import Insurer from "./Insurer";
import Partner from "./Partner";
import ContractExtend from "@/entity/extends/ContractExtend";
import Asset from "./Asset";

export default class Contract extends ContractExtend {

    public id!: number;
    // @ts-ignore
    public startAt: Date;
    // @ts-ignore
    public expireAt: Date;
    public status = '';
    public manager? = '';
    public source? = '';
    public subscriber!: Customer;
    public type? = '';
    public police? = '';
    public contributor? = '';
    public branch!: Branch;
    public avenants: Array<Avenant> = [];
    public previousAvenants: Array<Avenant> = [];
    public root?: Item;
    private number = ''
    public dateEmission?: Date;
    public primeTTC?: number;
    public insurer!: Insurer;
    public actifs: Array<Item> = [];
    public duration? = '';
    public emitBy? = '';
    public partner?: Partner;
    public partnerCode = '';
    public deletedAt?: Date;
    public uuid = '';

public signDate?: Date;
    public createdAt?: Date;
    public updatedAt?: Date;
    public createBy? = '';
    public updateBy? = '';
    public removeBy? = '';
    public createdFromIp? = '';
    public updatedFromIp? = '';
    public warnings: string[] = []
    public alias? = '';
    public aliases= [];
    public assets: Array<Asset> = [];

    constructor(object?: any) {
        super(object)
        if (object) {
            this.id = object.id;
            if (object.startAt) {
                this.startAt = new Date(object.startAt);
            }
            if (object.expireAt) {
                this.expireAt = new Date(object.expireAt);
            }
            this.warnings = object.warnings;
            this.status = object.status;
            this.manager = object.manager;
            this.partnerCode = object.partnerCode;
            this.number = object.number;
            this.subscriber = (object.subscriber instanceof Customer) ? object.subscriber : object.subscriber ? new Customer(object.subscriber) : object.subscriber;
            this.type = object.type;
            this.police = object.police;
            this.contributor = object.contributor;
            this.branch = (object.branch instanceof Branch) ? object.branch : object.branch ? new Branch(object.branch) : object.branch;
            if (object.avenants) {
                object.avenants.forEach((occ: any) => {
                    const avenant = occ instanceof Avenant ? occ : new Avenant(occ);
                    this.avenants.push(avenant);
                });
            }

            if (object.previousAvenants) {
                object.previousAvenants.forEach((occ: any) => {
                    const previousAvenant = occ instanceof Avenant ? occ : new Avenant(occ);
                    this.previousAvenants.push(previousAvenant);
                });
            }
            this.root = (object.root instanceof Item) ? object.root : object.root ? new Item(object.root) : object.root;
            if (object.dateEmission) {
                this.dateEmission = new Date(object.dateEmission);
            }
            this.primeTTC = object.primeTTC;
            this.insurer = (object.insurer instanceof Insurer) ? object.insurer : object.insurer ? new Insurer(object.insurer) : object.insurer;
            if (object.actifs) {
                object.actifs.forEach((occ: any) => {
                    const item = occ instanceof Item ? occ : new Item(occ);
                    this.actifs.push(item);
                });
            }
            this.duration = object.duration;
            this.emitBy = object.emitBy;
            this.source = object.source;
            this.alias = object.alias;
            this.aliases = object.aliases;
            this.partner = (object.partner instanceof Partner) ? object.partner : object.partner ? new Partner(object.partner) : object.partner;
            if (object.deletedAt) {
                this.deletedAt = new Date(object.deletedAt);
            }
            this.uuid = object.uuid;
            if (object.createdAt) {
                this.createdAt = new Date(object.createdAt);
            }
            if (object.updatedAt) {
                this.updatedAt = new Date(object.updatedAt);
            }
            if(object.signDate){
                this.signDate= new Date(object.signDate);
            }
            this.createBy = object.createBy;
            this.updateBy = object.updateBy;
            this.removeBy = object.removeBy;
            this.createdFromIp = object.createdFromIp;
            this.updatedFromIp = object.updatedFromIp;
            if (object.assets) {
                object.assets.forEach((occ: any) => {
                    const asset = occ instanceof Asset ? occ : new Asset(occ);
                    this.assets.push(asset);
                });
            }
        }
        this.postConstruct()
    }

}

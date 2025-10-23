/* eslint-disabled */
import ResponseGroup from "./ResponseGroup";
import OrderExtend from "@/entity/extends/OrderExtend";

export default class Order extends OrderExtend {

    public id!: number;
    public responseGroup!: ResponseGroup;
    public entities = [];
    public premium!: number;
    public number = '';
    public details = [];
    public insurer = '';
    public startAt?: Date;
    public duration = [];
    public premiumDetails = [];
    public files = [];
    public town? = '';
    public address? = '';
    public contact? = '';
    public status = '';
    public engine? = '';
    public voucher? = '';
    public paymentMethod? = '';
    public subscribers = [];
    public contract? = '';
    public moreOptions = [];
    public fileRecipients = [];
    public commissions = [];
    public reductions: any[] = [];
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
            this.responseGroup = (object.responseGroup instanceof ResponseGroup) ? object.responseGroup : object.responseGroup ? new ResponseGroup(object.responseGroup) : object.responseGroup;
            this.entities = object.entities;
            this.premium = object.premium;
            this.number = object.number;
            this.details = object.details;
            this.insurer = object.insurer;
            if (object.startAt) {
                this.startAt = new Date(object.startAt);
            }
            this.duration = object.duration;
            this.premiumDetails = object.premiumDetails;
            this.files = object.files;
            this.town = object.town;
            this.address = object.address;
            this.contact = object.contact;
            this.status = object.status;
            this.partner = object.partner;
            this.engine = object.engine;
            this.voucher = object.voucher;
            this.paymentMethod = object.paymentMethod;
            this.subscribers = object.subscribers;
            this.contract = object.contract;
            this.moreOptions = object.moreOptions;
            this.fileRecipients = object.fileRecipients;
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
        }
        this.postConstruct()
    }

}

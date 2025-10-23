/* eslint-disabled */
import Contract from "./Contract";
import PaymentMethod from "./PaymentMethod";
import Customer from "./Customer";
import BrownCard from "./BrownCard";
import Account from "./Account";
import Item from "./Item";
import PartnerExtend from "@/entity/extends/PartnerExtend";
import Role from "./Role";

export default class Partner extends PartnerExtend {

    public id!: number;
    public name? = '';
    public code = '';
    public contact? = '';
    public crmId? = '';
    public contracts: Array<Contract> = [];
    public paymentMethods: Array<PaymentMethod> = [];
    public customers: Array<Customer> = [];
    public roles: string[] = []
    public brownCards: Array<BrownCard> = [];
    public allowedPacks: number[] = [];
    public active? = '';
    public agency? = '';
    public uuid? = '';
    public tenants= [];
    public createdAt?: Date;
    public deletedAt?: Date;
    public updatedAt?: Date;
    public createBy? = '';
    public updateBy? = '';
    public removeBy? = '';
    public createdFromIp? = '';
    public updatedFromIp? = '';
    public account!: Account;
    public item!: Item;
    public lastToken?: Date;
    public parameters = '';
    constructor(object?: any) {
        super(object)
        if (object) {
            this.id = object.id;
            this.name = object.name;
            this.code = object.code;
            this.contact = object.contact;
            this.crmId = object.crmId;
            this.allowedPacks = object.allowedPacks ?? [];

            if (object.contracts) {
                object.contracts.forEach((occ: any) => {
                    const contract = occ instanceof Contract ? occ : new Contract(occ);
                    this.contracts.push(contract);
                });
            }
            if (object.roles) {
                object.roles.forEach((occ: any) => {
                    const role = occ
                    this.roles.push(role);
                });
            }
            if (object.paymentMethods) {
                object.paymentMethods.forEach((occ: any) => {
                    const paymentmethod = occ instanceof PaymentMethod ? occ : new PaymentMethod(occ);
                    this.paymentMethods.push(paymentmethod);
                });
            }
            if (object.customers) {
                object.customers.forEach((occ: any) => {
                    const customer = occ instanceof Customer ? occ : new Customer(occ);
                    this.customers.push(customer);
                });
            }
            if (object.brownCards) {
                object.brownCards.forEach((occ: any) => {
                    const browncard = occ instanceof BrownCard ? occ : new BrownCard(occ);
                    this.brownCards.push(browncard);
                });
            }
            this.active = object.active;
            this.agency = object.agency;
            this.uuid = object.uuid;
            if (object.createdAt) {
                this.createdAt = new Date(object.createdAt);
            }
            if (object.deletedAt) {
                this.deletedAt = new Date(object.deletedAt);
            }
            if (object.updatedAt) {
                this.updatedAt = new Date(object.updatedAt);
            }
            if (object.lastToken) {
                this.lastToken = new Date(object.lastToken);
            }
            this.parameters = object.parameters;
            this.tenants= object.tenants;
            this.createBy = object.createBy;
            this.updateBy = object.updateBy;
            this.removeBy = object.removeBy;
            this.createdFromIp = object.createdFromIp;
            this.updatedFromIp = object.updatedFromIp;
            this.account = (object.account instanceof Account) ? object.account : object.account ? new Account(object.account) : object.account;
            this.item = (object.item instanceof Item) ? object.item : object.item ? new Item(object.item) : object.item;
        }
        this.postConstruct()
    }

}

/* eslint-disabled */
import PaymentMethod from "./PaymentMethod";
import Account from "./Account";
import Avenant from "./Avenant";
import Receipt from "./Receipt";
import Invoice from "./Invoice";
import AccountOperation from "./AccountOperation";
import PaymentTransactionExtend from "@/entity/extends/PaymentTransactionExtend";

export default class PaymentTransaction extends PaymentTransactionExtend {

    public id = '';
    public token? = '';
    public initiator? = '';
    public status = '';
    public amount = 0;
    public data = [];
    public method!: PaymentMethod;
    public type? = '';
    public target? = '';
    public errors = [];
    public response = [];
    public contact? = '';
    public source!: Account;
    public destination!: Account;
    public label? = '';
    public avenant!: Avenant;
    public receipt!: Receipt;
    public link? = '';
    public processed?: boolean;
    public nextAction? = '';
    public message? = '';
    public processing?: boolean;
    public invoice!: Invoice;
    public debit!: AccountOperation;
    public credit!: AccountOperation;
    public uuid? = '';
    public createdAt? = '';
    public updatedAt? = '';
    public createBy? = '';
    public updateBy? = '';
    public removeBy? = '';
    public createdFromIp? = '';
    public updatedFromIp? = '';
    public deletedAt? = '';
    public replacedBy!: PaymentTransaction;
    public replaced: Array<PaymentTransaction> = [];

    constructor(object?: any) {
        super(object)
        if (object) {
            this.id = object.id;
            this.token = object.token;
            this.initiator = object.initiator;
            this.status = object.status;
            this.amount = object.amount;
            this.data = object.data;
            this.method = (object.method instanceof PaymentMethod) ? object.method : object.method ? new PaymentMethod(object.method) : object.method;
            this.type = object.type;
            this.target = object.target;
            this.errors = object.errors;
            this.response = object.response;
            this.contact = object.contact;
            this.source = (object.source instanceof Account) ? object.source : object.source ? new Account(object.source) : object.source;
            this.destination = (object.destination instanceof Account) ? object.destination : object.destination ? new Account(object.destination) : object.destination;
            this.label = object.label;
            this.avenant = (object.avenant instanceof Avenant) ? object.avenant : object.avenant ? new Avenant(object.avenant) : object.avenant;
            this.receipt = (object.receipt instanceof Receipt) ? object.receipt : object.receipt ? new Receipt(object.receipt) : object.receipt;
            this.link = object.link;
            this.processed = object.processed;
            this.nextAction = object.nextAction;
            this.message = object.message;
            this.processing = object.processing;
            this.invoice = (object.invoice instanceof Invoice) ? object.invoice : object.invoice ? new Invoice(object.invoice) : object.invoice;
            this.debit = (object.debit instanceof AccountOperation) ? object.debit : object.debit ? new AccountOperation(object.debit) : object.debit;
            this.credit = (object.credit instanceof AccountOperation) ? object.credit : object.credit ? new AccountOperation(object.credit) : object.credit;

            this.replacedBy = (object.replacedBy instanceof PaymentTransaction) ? object.replacedBy : object.replacedBy ? new PaymentTransaction(object.replacedBy) : object.replacedBy;
            if (object.replaced) {
                object.replaced.forEach((occ: any) => {
                    const paymenttransaction = occ instanceof PaymentTransaction ? occ : new PaymentTransaction(occ);
                    this.replaced.push(paymenttransaction);
                });
            }

            this.uuid = object.uuid;
            this.createdAt = object.createdAt;
            this.updatedAt = object.updatedAt;
            this.createBy = object.createBy;
            this.updateBy = object.updateBy;
            this.removeBy = object.removeBy;
            this.createdFromIp = object.createdFromIp;
            this.updatedFromIp = object.updatedFromIp;
            this.deletedAt = object.deletedAt;
        }
        this.postConstruct()
    }

}

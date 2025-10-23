/* eslint-disabled */
import MessageExtend from "@/entity/extends/MessageExtend";

export default class Message extends MessageExtend {

    public id = '';
    public type = '';
    public status = '';
    public fid? = '';
    public data: any = [];
    public isSent = '';
    public oldContents? = '';
    public question? = '';
    public rgUuid? = '';
    public source? = '';
    public readers: any[] = [];
    public partner? = '';
    public uuid? = '';
    public createdAt?: Date;
    public updatedAt?: Date;
    public deletedAt?: Date;

    constructor(object?: any) {
        super(object)
        if (object) {
            this.id = object.id;
            this.type = object.type;
            this.status = object.status;
            this.fid = object.fid;
            this.data = object.data;
            this.isSent = object.isSent;
            this.oldContents = object.oldContents;
            this.question = object.question;
            this.rgUuid = object.rgUuid;
            this.source = object.source;
            this.readers = object.readers;
            this.partner = object.partner;
            this.uuid = object.uuid;
            if (object.createdAt) {
                this.createdAt = new Date(object.createdAt);
            }
            if (object.updatedAt) {
                this.updatedAt = new Date(object.updatedAt);
            }
            if (object.deletedAt) {
                this.deletedAt = new Date(object.deletedAt);
            }
        }
        this.postConstruct()
    }

}

/* eslint-disabled */
import User from "./User";
import Tenant from "./Tenant";
import TodoExtend from "@/entity/extends/TodoExtend";

export default class Todo extends TodoExtend {

    public id!: number;
    public label?= '';
    public deadline?: Date;
    public comment?= '';
    public type = '';
    public status = '';
    public data = [];
    public user!: User;
    public subject?= '';
    public url?= '';
    public tenant!: Tenant;
    public uuid = '';
    public createdAt?: Date;
    public updatedAt?: Date;
    public createdFromIp?= '';
    public updatedFromIp?= '';
    public deletedAt?: Date;

    constructor(object?: any) {
        super(object)
        if (object) {
            this.id = object.id;
            this.label = object.label;
            if (object.deadline) {
                this.deadline = new Date(object.deadline);
            }
            this.comment = object.comment;
            this.type = object.type;
            this.status = object.status;
            this.data = object.data;
            this.user = (object.user instanceof User) ? object.user : object.user ? new User(object.user) : object.user;
            this.subject = object.subject;
            this.url = object.url;
            this.tenant = (object.tenant instanceof Tenant) ? object.tenant : object.tenant ? new Tenant(object.tenant) : object.tenant;
            this.uuid = object.uuid;
            if (object.createdAt) {
                this.createdAt = new Date(object.createdAt);
            }
            if (object.updatedAt) {
                this.updatedAt = new Date(object.updatedAt);
            }
            this.createdFromIp = object.createdFromIp;
            this.updatedFromIp = object.updatedFromIp;
            if (object.deletedAt) {
                this.deletedAt = new Date(object.deletedAt);
            }
        }
        this.postConstruct()
    }

}

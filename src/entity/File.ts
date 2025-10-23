/* eslint-disable */
import Folder from "./Folder";
import User from "./User";

export default class File {

    public id!: number;
    public src = '';
    public realName = '';
    public type? = '';
    public folder?: Folder;
    public deletedAt?: Date;
    public uuid = '';
    public createdAt?: Date;
    public updatedAt?: Date;
    public createBy?: User;
    public updateBy?: User;
    public removeBy?: User;
    public createdFromIp? = '';
    public updatedFromIp? = '';

    constructor(object?: any) {
        if (object) {
            this.id = object.id;
            this.src = object.src;
            this.realName = object.realName;
            this.type = object.type;
            this.folder = (object.folder instanceof Folder) ? object.folder : new Folder(object.folder);
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
            this.createBy = (object.createBy instanceof User) ? object.createBy : new User(object.createBy);
            this.updateBy = (object.updateBy instanceof User) ? object.updateBy : new User(object.updateBy);
            this.removeBy = (object.removeBy instanceof User) ? object.removeBy : new User(object.removeBy);
            this.createdFromIp = object.createdFromIp;
            this.updatedFromIp = object.updatedFromIp;
        }
    }

    get excerpt(): string {

        let ln = '';
        if (this.realName.length > 30) {
            ln = this.realName.substring(0, 20);
            ln += '...' + this.realName.substring((this.realName.length - 5), this.realName.length);
            return ln;
        }
        return this.realName;

    }

    get name(): string {
        return this.realName;
    }

}

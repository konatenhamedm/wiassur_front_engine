/* eslint-disabled */
import ResponseGroup from "./ResponseGroup";
import Question from "./Question";
import ResponseExtend from "@/entity/extends/ResponseExtend";
import {helper} from "@/services/Helper";

export default class Response extends ResponseExtend {

    public id!: number;

    public responseGroup?: ResponseGroup;
    public comment? = '';
    public value? = '';
    public responseGroups: Array<ResponseGroup> = [];
    public question?: Question;
    public uuid = helper.generateId();
    public createdAt?: Date;
    public updatedAt?: Date;
    public createdFromIp? = '';
    public updatedFromIp? = '';

    constructor(object?: any) {
        super(object)
        if (object) {
            this.id = object.id;
            this.responseGroup = (object.responseGroup instanceof ResponseGroup) ? object.responseGroup : new ResponseGroup(object.responseGroup);
            this.comment = object.comment;
            this.value = object.value;
            if (object.responseGroups) {
                object.responseGroups.forEach((occ: any) => {
                    const responsegroup = new ResponseGroup(occ);
                    this.responseGroups.push(responsegroup);
                });
            }
            this.question = (object.question instanceof Question) ? object.question : new Question(object.question);
            this.uuid = object.uuid;
            if (object.createdAt) {
                this.createdAt = new Date(object.createdAt);
            }
            if (object.updatedAt) {
                this.updatedAt = new Date(object.updatedAt);
            }
            this.createdFromIp = object.createdFromIp;
            this.updatedFromIp = object.updatedFromIp;
        }
    }

}

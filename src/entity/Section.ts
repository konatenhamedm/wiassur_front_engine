/* eslint-disabled */
import Step from "./Step";
import Question from "./Question";
import User from "./User";
import SectionExtend from "@/entity/extends/SectionExtend";

export default class Section extends SectionExtend {

    public id!: number;
    public label = '';
    public step?: Step;
    public ranking!: number;
    public template? = '';
    public description? = '';
    public questions: Array<Question> = [];
    public uuid = '';
    public createdAt?: Date;
    public updatedAt?: Date;
    public createBy?: User;
    public updateBy?: User;
    public removeBy?: User;
    public createdFromIp? = '';
    public updatedFromIp? = '';
    public requiredRoles = [];

    constructor(object?: any) {
        super(object)
        if (object) {
            this.id = object.id;
            this.label = object.label;
            this.step = (object.step instanceof Step) ? object.step : new Step(object.step);
            this.ranking = object.ranking;
            this.template = object.template;
            this.description = object.description;
            if (object.questions) {
                object.questions.forEach((occ: any) => {
                    const question = new Question(occ);
                    this.questions.push(question);
                });
            }
            this.requiredRoles = object.requiredRoles;

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

}

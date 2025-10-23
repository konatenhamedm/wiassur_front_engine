/* eslint-disabled */
import EmailJob from "./EmailJob";
import Action from "./Action";
import EmailTemplateExtend from "@/entity/extends/EmailTemplateExtend";

export default class EmailTemplate extends EmailTemplateExtend {

    public id!: number;
    public object = '';
    public jobs: Array<EmailJob> = [];
    public item = [];
    public defaultRecipients: any[] = [];
    public name? = '';
    public description? = '';
    public action: Array<Action> = [];
    public label? = '';
    public uuid? = '';
    public createdAt?: Date;
    public updatedAt?: Date;

    constructor(object?: any) {
        super(object)
        if (object) {
            this.id = object.id;
            this.object = object.object;
            if (object.jobs) {
                object.jobs.forEach((occ: any) => {
                    const emailjob = occ instanceof EmailJob ? occ : new EmailJob(occ);
                    this.jobs.push(emailjob);
                });
            }
            this.item = object.item;
            this.defaultRecipients = object.defaultRecipients;
            this.name = object.name;
            this.description = object.description;
            if (object.action) {
                object.action.forEach((occ: any) => {
                    const action = occ instanceof Action ? occ : new Action(occ);
                    this.action.push(action);
                });
            }
            this.label = object.label;
            this.uuid = object.uuid;
            if (object.createdAt) {
                this.createdAt = new Date(object.createdAt);
            }
            if (object.updatedAt) {
                this.updatedAt = new Date(object.updatedAt);
            }
        }
        this.postConstruct()
    }

}

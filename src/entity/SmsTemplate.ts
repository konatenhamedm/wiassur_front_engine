/* eslint-disabled */
import SmsJob from "./SmsJob";
import Action from "./Action";
import SmsTemplateExtend from "@/entity/extends/SmsTemplateExtend";

export default class SmsTemplate extends SmsTemplateExtend {

    public id!: number;
    public sender = '';
    public content = '';
    public jobs: Array<SmsJob> = [];
    public action: Array<Action> = [];
    public name = '';
    public description? = '';
    public defaultRecipients: any[] = [];
    public label? = '';

    constructor(object?: any) {
        super(object)
        if (object) {
            this.id = object.id;
            this.sender = object.sender;
            this.content = object.content;
            if (object.jobs) {
                object.jobs.forEach((occ: any) => {
                    const smsjob = occ instanceof SmsJob ? occ : new SmsJob(occ);
                    this.jobs.push(smsjob);
                });
            }
            if (object.action) {
                object.action.forEach((occ: any) => {
                    const action = occ instanceof Action ? occ : new Action(occ);
                    this.action.push(action);
                });
            }
            this.name = object.name;
            this.description = object.description;
            this.defaultRecipients = object.defaultRecipients;
            this.label = object.label;
        }
        this.postConstruct()
    }

}

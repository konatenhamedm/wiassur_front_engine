/* eslint-disabled */
import Campaign from "./Campaign";
import SmsTemplate from "./SmsTemplate";
import WhatsappTemplate from "./WhatsappTemplate";
import EmailTemplate from "./EmailTemplate";
import SmsJob from "./SmsJob";
import EmailJob from "./EmailJob";
import Item from "./Item";
import ActionExtend from "@/entity/extends/ActionExtend";

export default class Action extends ActionExtend {

    public id!: number;
    public type = '';
    public waitingTime?: number;
    public campaign!: Campaign;
    public smsTemplate!: SmsTemplate;
    public whatsappTemplate!: WhatsappTemplate;
    public emailTemplate!: EmailTemplate;
    public ranking!: number;
    public smsJobs: Array<SmsJob> = [];
    public emailJobs: Array<EmailJob> = [];
    public nextItems: Array<Item> = [];

    constructor(object?: any) {
        super(object)
        if (object) {
            this.id = object.id;
            this.type = object.type;
            this.waitingTime = object.waitingTime;
            this.campaign = (object.campaign instanceof Campaign) ? object.campaign : object.campaign ? new Campaign(object.campaign) : object.campaign;
            this.smsTemplate = (object.smsTemplate instanceof SmsTemplate) ? object.smsTemplate : object.smsTemplate ? new SmsTemplate(object.smsTemplate) : object.smsTemplate;
            this.whatsappTemplate = (object.whatsappTemplate instanceof WhatsappTemplate) ? object.whatsappTemplate : object.whatsappTemplate ? new WhatsappTemplate(object.whatsappTemplate) : object.whatsappTemplate;
            this.emailTemplate = (object.emailTemplate instanceof EmailTemplate) ? object.emailTemplate : object.emailTemplate ? new EmailTemplate(object.emailTemplate) : object.emailTemplate;
            this.ranking = object.ranking;
            if (object.smsJobs) {
                object.smsJobs.forEach((occ: any) => {
                    const smsjob = occ instanceof SmsJob ? occ : new SmsJob(occ);
                    this.smsJobs.push(smsjob);
                });
            }
            if (object.emailJobs) {
                object.emailJobs.forEach((occ: any) => {
                    const emailjob = occ instanceof EmailJob ? occ : new EmailJob(occ);
                    this.emailJobs.push(emailjob);
                });
            }
            if (object.nextItems) {
                object.nextItems.forEach((occ: any) => {
                    const item = occ instanceof Item ? occ : new Item(occ);
                    this.nextItems.push(item);
                });
            }
        }
        this.postConstruct()
    }

}

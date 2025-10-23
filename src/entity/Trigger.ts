/* eslint-disabled */
import Campaign from "./Campaign";
import TriggerExtend from "@/entity/extends/TriggerExtend";

export default class Trigger extends TriggerExtend {

    public id!: number;
    public campaign!: Campaign;
    public event = '';
    public api = '';
    public type = '';
    public parameters = [];
    public isActive?: boolean;

    constructor(object?: any) {
        super(object)
        if (object) {
            this.id = object.id;
            this.campaign = (object.campaign instanceof Campaign) ? object.campaign : object.campaign ? new Campaign(object.campaign) : object.campaign;
            this.event = object.event;
            this.api = object.api;
            this.type = object.type;
            this.parameters = object.parameters;
            this.isActive = object.isActive;
        }
        this.postConstruct()
    }

}

/* eslint-disabled */
import Survey from "./Survey";
import Response from "./Response";
import Prospect from "./Prospect";
import Device from "./Device";
import Location from "./Location";
import Note from "./Note";
import Todo from "./Todo";
import ResponseGroupExtend from "@/entity/extends/ResponseGroupExtend";
import Order from "./Order";

export default class ResponseGroup extends ResponseGroupExtend {

    public id!: number;
    public survey!: Survey;
    public responses: Array<Response> = [];
    public parent?: Response;
    public prospect?: Prospect;
    public device?: Device;
    public state!: number;
    public status = '';
    public partner = '';
    public location?: Location;
    public alias? = '';
    public lastVisit?: Date;
    public currentStepRank = 0
    public mailLinkOpened?: boolean;
    public manager? = '';
    public source? = '';
    public notes: Array<Note> = [];
    public orders: Array<Order> = [];
    public todos: Array<Todo> = [];
    public uuid = '';
    public value: any = null
    public createdAt?: Date;
    public updatedAt?: Date;
    public createBy? = '';
    public updateBy? = '';
    public removeBy? = '';
    public createdFromIp? = '';
    public updatedFromIp? = '';
    public godfather = null;
    public qualified? = null;
    public qualificationHistory = [];
    public extraPremium?: number;
    public extraPremiumValidated?: boolean;

    constructor(object?: any) {
        super(object)
        if (object) {
            this.id = object.id;
            this.currentStepRank = object.currentStepRank
            this.status = object.status
            this.source = object.source
            this.qualified = object.qualified;
            this.qualificationHistory = object.qualificationHistory;
            this.survey = (object.survey instanceof Survey) ? object.survey : new Survey(object.survey);
            if (object.responses) {
                object.responses.forEach((occ: any) => {
                    const response = occ instanceof Response ? occ : new Response(occ);
                    this.responses.push(response);
                });
            }
            if (object.orders) {
                object.orders.forEach((occ: any) => {
                    const order = occ instanceof Order ? occ : new Order(occ);
                    this.orders.push(order);
                });
            }
            this.value = object.value
            this.godfather = object.godfather;
            this.parent = (object.parent instanceof Response) ? object.parent : new Response(object.parent);
            this.prospect = (object.prospect instanceof Prospect) ? object.prospect : new Prospect(object.prospect);
            this.device = (object.device instanceof Device) ? object.device : new Device(object.device);
            this.state = object.state;
            this.status = object.status;
            this.location = (object.location instanceof Location) ? object.location : new Location(object.location);
            this.alias = object.alias;
            this.partner = object.partner;
            if (object.lastVisit) {
                this.lastVisit = new Date(object.lastVisit);
            }
            this.mailLinkOpened = object.mailLinkOpened;
            this.manager = object.manager;

       this.extraPremium= object.extraPremium;
       this.extraPremiumValidated= object.extraPremiumValidated;
            if (object.notes) {
                object.notes.forEach((occ: any) => {
                    const note = occ instanceof Note ? occ : new Note(occ);
                    this.notes.push(note);
                });
            }
            if (object.todos) {
                object.todos.forEach((occ: any) => {
                    const todo = occ instanceof Todo ? occ : new Todo(occ);
                    this.todos.push(todo);
                });
            }
            this.uuid = object.uuid;
            if (object.createdAt) {
                this.createdAt = new Date(object.createdAt);
            }
            if (object.updatedAt) {
                this.updatedAt = new Date(object.updatedAt);
            }
            this.createBy = object.createBy;
            this.updateBy = object.updateBy;
            this.removeBy = object.removeBy;
            this.createdFromIp = object.createdFromIp;
            this.updatedFromIp = object.updatedFromIp;
        }
        this.postConstruct()
    }

}

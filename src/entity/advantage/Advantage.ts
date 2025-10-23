/* eslint-disabled */
import Partner from "./Partner";
import Contact from "./Contact";
import AdvantageExtend from "./extends/AdvantageExtend";

export default class Advantage extends AdvantageExtend {

    public id!: number;
    public label = '';
    public description? = '';
    public activation? = '';
    public startAt?: Date;
    public endAt?: Date;
    public partner!: Partner;
    public contacts: Array<Contact> = [];
    public isActive?: boolean;
    public value? = '';
    public photo? = '';
    public alt? = '';
    public uuid? = '';
    public createdAt?: Date;
    public updatedAt?: Date;
    public createBy? = '';
    public updateBy? = '';
    public removeBy? = '';
    public createdFromIp? = '';
    public updatedFromIp? = '';

    constructor (object?: any) {
        super(object)
        if(object){
            this.id= object.id;
            this.label= object.label;
            this.description= object.description;
            this.activation= object.activation;
            if(object.startAt){
                this.startAt= new Date(object.startAt);
            }
            if(object.endAt){
                this.endAt= new Date(object.endAt);
            }
            this.partner = (object.partner instanceof Partner) ? object.partner : object.partner ? new Partner(object.partner) : object.partner;
            if(object.contacts){
                object.contacts.forEach((occ: any)=>{
                    const contact= occ instanceof Contact? occ :  new Contact(occ);
                    this.contacts.push(contact);
                });
            }
            this.isActive= object.isActive;
            this.value= object.value;
            this.photo= object.photo;
            this.alt= object.alt;
            this.uuid= object.uuid;
            if(object.createdAt){
                this.createdAt= new Date(object.createdAt);
            }
            if(object.updatedAt){
                this.updatedAt= new Date(object.updatedAt);
            }
            this.createBy= object.createBy;
            this.updateBy= object.updateBy;
            this.removeBy= object.removeBy;
            this.createdFromIp= object.createdFromIp;
            this.updatedFromIp= object.updatedFromIp;
        }
        this.postConstruct()
    }

}

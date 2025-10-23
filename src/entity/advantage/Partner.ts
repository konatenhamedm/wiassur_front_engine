/* eslint-disabled */
import Agency from "./Agency";
import Advantage from "./Advantage";
import Contact from "./Contact";
import PartnerExtend from "./extends/PartnerExtend";

export default class Partner extends PartnerExtend {

    public id!: number;
    public name? = '';
    public tradeName? = '';
    public description? = '';
    public address? = '';
    public agencies: Array<Agency> = [];
    public website? = '';
    public facebook? = '';
    public instagram? = '';
    public tiktok? = '';
    public advantages: Array<Advantage> = [];
    public contacts: Array<Contact> = [];
    public photo? = '';
    public alt? = '';

    constructor (object?: any) {
        super(object)
        if(object){
            this.id= object.id;
            this.name= object.name;
            this.tradeName= object.tradeName;
            this.description= object.description;
            this.address= object.address;
            if(object.agencies){
                object.agencies.forEach((occ: any)=>{
                    const agency= occ instanceof Agency? occ :  new Agency(occ);
                    this.agencies.push(agency);
                });
            }
            this.website= object.website;
            this.facebook= object.facebook;
            this.instagram= object.instagram;
            this.tiktok= object.tiktok;
            if(object.advantages){
                object.advantages.forEach((occ: any)=>{
                    const advantage= occ instanceof Advantage? occ :  new Advantage(occ);
                    this.advantages.push(advantage);
                });
            }
            if(object.contacts){
                object.contacts.forEach((occ: any)=>{
                    const contact= occ instanceof Contact? occ :  new Contact(occ);
                    this.contacts.push(contact);
                });
            }
            this.photo= object.photo;
            this.alt= object.alt;
        }
        this.postConstruct()
    }

}

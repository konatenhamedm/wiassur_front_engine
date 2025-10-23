/* eslint-disabled */
import Pack from "./Pack";
import PackFileExtend from "@/entity/extends/PackFileExtend";

export default class PackFile extends PackFileExtend {

    public id!: number;
    public name = '';
    public consent?: boolean;
    public pack?: Pack;
    public filename? = '';

    constructor (object?: any) {
        super(object)
        if(object){
            this.id= object.id;
            this.name= object.name;
            this.consent= object.consent;
            if(object.pack){
                this.pack = (object.pack instanceof Pack) ? object.pack : new Pack(object.pack);
            }
            this.filename= object.filename;
        }
    }

}

/* eslint-disabled */
import PremiumDetailModel from "./PremiumDetailModel";
import Avenant from "./Avenant";
import PremiumDetailExtend from "@/entity/extends/PremiumDetailExtend";

export default class PremiumDetail extends PremiumDetailExtend {

    public id!: number;
    public model!: PremiumDetailModel;
    public premium!: number;
    public avenant?: Avenant;
    public label = ''

    constructor (object?: any) {
        super(object)
        if(object){
            this.id= object.id;
            this.label=object.label
            this.model = (object.model instanceof PremiumDetailModel) ? object.model : object.model ? new PremiumDetailModel(object.model) : object.model;
            this.premium= object.premium;
            this.avenant = (object.avenant instanceof Avenant) ? object.avenant : object.avenant ? new Avenant(object.avenant) : object.avenant;
        }
        this.postConstruct()
    }

}

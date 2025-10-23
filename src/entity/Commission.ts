/* eslint-disabled */
import Avenant from "./Avenant";
import CommissionModel from "./CommissionModel";
import CommissionExtend from "@/entity/extends/CommissionExtend";

export default class Commission extends CommissionExtend {

    public id!: number;
    public premium!: number;
    public payed!: boolean;
    public avenant!: Avenant;
    public data = [];
    public model!: CommissionModel;

    constructor(object?: any) {
        super(object)
        if (object) {
            this.id = object.id;
            this.premium = object.premium;
            this.payed = object.payed;
            this.avenant = (object.avenant instanceof Avenant) ? object.avenant : object.avenant ? new Avenant(object.avenant) : object.avenant;
            this.data = object.data;
            this.model = (object.model instanceof CommissionModel) ? object.model : object.model ? new CommissionModel(object.model) : object.model;
        }
        this.postConstruct()
    }

}

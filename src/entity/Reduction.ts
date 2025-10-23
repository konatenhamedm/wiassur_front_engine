/* eslint-disabled */
import ReductionModel from "./ReductionModel";
import ReductionExtend from "@/entity/extends/ReductionExtend";

export default class Reduction extends ReductionExtend {

    public id!: number;
    public premium!: number;
    public data? = '';
    public model!: ReductionModel;

    constructor (object?: any) {
        super(object)
        if(object){
            this.id= object.id;
            this.premium= object.premium;
            this.data= object.data;
            this.model = (object.model instanceof ReductionModel) ? object.model : object.model ? new ReductionModel(object.model) : object.model;
        }
        this.postConstruct()
    }

}

/* eslint-disabled */
import Property from "./Property";
import EngineArgumentExtend from "@/entity/extends/EngineArgumentExtend";
import DataType from "@/entity/DataType";
import {helper} from "@/services/Helper";

export default class EngineArgument extends EngineArgumentExtend {
    public id!: number;
    public uuid = helper.generateId()
    public type!: DataType;
    public choices: any[] = [];
    public code = '';
    public alias? = '';
    public name = '';
    public value = ''

    constructor(object?: any) {
        // console.log(object)
        super(object)
        if (object) {
            this.id = object.id;
            this.choices = object.choices
            this.code = object.code
            this.name = object.name
            this.alias = object.alias
            this.value = object.value
            this.uuid = object.uuid

        }
        this.postConstruct()
        // console.log(this)
    }

}

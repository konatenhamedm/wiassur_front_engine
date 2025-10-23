/* eslint-disabled */
import EngineArgument from "./EngineArgument";
import EngineMethodLine from "./EngineMethodLine";
import EnginePlaceExtend from "@/entity/extends/EnginePlaceExtend";
import {helper} from "@/services/Helper";

export default class EnginePlace extends EnginePlaceExtend {

    public id!: number;
    public uuid = helper.generateId();
    public argument!: EngineArgument;
    public callableArgumentPlaces: EnginePlace[] = [];
    public requirement?: number
    public symbol? = '';
    public value? = '';

    constructor(object?: any) {
        super(object)
        if (object) {
            this.id = object.id;

            if (object.callableArgumentPlaces) {
                object.callableArgumentPlaces.forEach((occ: any) => {
                    const place = occ instanceof EnginePlace ? occ : new EnginePlace(occ);
                    this.callableArgumentPlaces.push(place);
                });
            }

            this.argument = (object.argument instanceof EngineArgument) ? object.argument : object.argument ? new EngineArgument(object.argument) : object.argument;
            this.symbol = object.symbol;
            this.requirement = object.requirement
            this.uuid = object.uuid
            this.value = object.value;
        }
        this.postConstruct()
    }

}

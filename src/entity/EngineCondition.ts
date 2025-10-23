/* eslint-disabled */
import EngineArgument from "./EngineArgument";
import EngineConditionGroup from "./EngineConditionGroup";
import EngineConditionExtend from "@/entity/extends/EngineConditionExtend";
import {helper} from "@/services/Helper";

export default class EngineCondition extends EngineConditionExtend {

    public id!: number;
    public uuid = helper.generateId()
    // public first!: any;
    public first!: EngineArgument;
    public second!: any;
    public operator : any;
    public parent!: EngineConditionGroup;

    constructor(object?: any) {
        super(object)
        if (object) {
            this.uuid = object.uuid
            this.id = object.id;
            // this.first = object.first;
            this.first = (object.first instanceof EngineArgument) ? object.first : object.first ? new EngineArgument(object.first) : object.first;
            this.second = object.second;
            this.operator = object.operator;
            this.parent = (object.parent instanceof EngineConditionGroup) ? object.parent : object.parent ? new EngineConditionGroup(object.parent) : object.parent;
        }
        this.postConstruct()
    }

}

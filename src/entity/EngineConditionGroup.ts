/* eslint-disabled */
import EngineCondition from "./EngineCondition";
import EngineMethodLine from "./EngineMethodLine";
import EngineConditionGroupExtend from "@/entity/extends/EngineConditionGroupExtend";
import {helper} from "@/services/Helper";

export default class EngineConditionGroup extends EngineConditionGroupExtend {

    public id!: number;
    public uuid = helper.generateId()
    public conditions: Array<EngineCondition> = [];
    public methodLine!: EngineMethodLine;

    constructor(object?: any) {
        super(object)
        if (object) {
            this.uuid = object.uuid
            this.id = object.id;
            if (object.conditions) {
                object.conditions.forEach((occ: any) => {
                    const enginecondition = occ instanceof EngineCondition ? occ : new EngineCondition(occ);
                    this.conditions.push(enginecondition);
                });
            }
            this.methodLine = (object.methodLine instanceof EngineMethodLine) ? object.methodLine : object.methodLine ? new EngineMethodLine(object.methodLine) : object.methodLine;
        }
        this.postConstruct()
    }

}

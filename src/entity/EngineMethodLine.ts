/* eslint-disabled */
import EngineMethod from "./EngineMethod";
import EngineConditionGroup from "./EngineConditionGroup";
import EnginePlace from "./EnginePlace";
import EngineArgument from "./EngineArgument";
import EngineMethodLineExtend from "@/entity/extends/EngineMethodLineExtend";
import {helper} from "@/services/Helper";

export default class EngineMethodLine extends EngineMethodLineExtend {

    public id!: number;
    public method!: EngineMethod;
    public conditionGroups: Array<EngineConditionGroup> = [];
    // public arguments: Array<EngineArgument> = [];
    public callable?: EngineMethod;
    public forElse?: EngineMethod;
    public type = '';
    public returnArgument?: EngineArgument;
    public isValid = false
    public isResult = false

    constructor(object?: any) {
        super(object)
        if (object) {
            this.id = object.id;
            this.method = (object.method instanceof EngineMethod) ? object.method : object.method ? new EngineMethod(object.method) : object.method;
            if (object.conditionGroups) {
                object.conditionGroups.forEach((occ: any) => {
                    const engineconditiongroup = occ instanceof EngineConditionGroup ? occ : new EngineConditionGroup(occ);
                    this.conditionGroups.push(engineconditiongroup);
                });
            }
            this.callable = (object.callable instanceof EngineMethod) ? object.callable : object.callable ? new EngineMethod(object.callable) : object.callable;
            this.forElse = (object.forElse instanceof EngineMethod) ? object.forElse : object.forElse ? new EngineMethod(object.forElse) : object.forElse;
            this.type = object.type;
            this.isResult = object.isResult
            this.returnArgument = (object.returnArgument instanceof EngineArgument) ? object.returnArgument : object.returnArgument ? new EngineArgument(object.returnArgument) : object.returnArgument;
            // if (object.uuid === '4d817723-e0b3-43e7-ad3d-55b3cc682a4f') {
            //     console.log('line get return name ' + object.returnArgument?.name + '=> ' + this.returnArgument?.name)
            // }

        }
        this.postConstruct()
        // if (object.uuid === '4d817723-e0b3-43e7-ad3d-55b3cc682a4f') {
        //     console.log('return name become ' + this.returnArgument?.name)
        // }

    }



}

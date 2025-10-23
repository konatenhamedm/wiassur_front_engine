/* eslint-disabled */
import EngineMethod from "./EngineMethod";
import ItemType from "./ItemType";
import EngineMethodRequirementExtend from "@/entity/extends/EngineMethodRequirementExtend";
import {helper} from "@/services/Helper";

export default class EngineMethodRequirement extends EngineMethodRequirementExtend {

    public id!: number;
    public uuid!: number
    public method!: EngineMethod;
    public itemType?: ItemType;
    public label = '';
    public code = '';

    constructor(object?: any) {
        super(object)
        if (object) {
            this.id = object.id;
            this.method = (object.method instanceof EngineMethod) ? object.method : object.method ? new EngineMethod(object.method) : object.method;
            this.itemType = (object.itemType instanceof ItemType) ? object.itemType : object.itemType ? new ItemType(object.itemType) : object.itemType;
            this.label = object.label;
            this.code = object.code;
            this.uuid = object.uuid
        }
        this.postConstruct()
    }

}

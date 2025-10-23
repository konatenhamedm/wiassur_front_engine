/* eslint-disabled */
import EngineMethodLine from "./EngineMethodLine";
import Engine from "./Engine";
import EngineMethodRequirement from "./EngineMethodRequirement";
import Insurer from "./Insurer";
import EngineMethodExtend from "@/entity/extends/EngineMethodExtend";
import CommissionModel from "./CommissionModel";
import EngineArgument from "@/entity/EngineArgument";

export default class EngineMethod extends EngineMethodExtend {

    public id!: number;
    public label = '';
    public code = '';
    public methodLines: Array<EngineMethodLine> = [];
    public engine!: Engine;
    public body? = '';
    public phpBody? = '';
    public requirements: Array<EngineMethodRequirement> = [];
    public uses: Array<EngineMethodLine> = [];
    public insurer?: Insurer;
    public showInDetails = false
    public alias = ''
    public description? = '';

    constructor(object?: any) {
        super(object)
        if (object) {
            this.id = object.id;
            this.label = object.label;
            this.code = object.code;
            if (object.methodLines) {
                object.methodLines.forEach((occ: any) => {
                    // console.log('--------------------------')
                    const enginemethodline = occ instanceof EngineMethodLine ? occ : new EngineMethodLine(occ);
                    this.methodLines.push(enginemethodline);
                    // console.log(enginemethodline.returnArgument?.name)
                });
            }
            this.alias= object.alias;
            this.alias = object.alias
            this.showInDetails = object.showInDetails
            this.engine = (object.engine instanceof Engine) ? object.engine : object.engine ? new Engine(object.engine) : object.engine;
            this.body = object.body;
            this.phpBody = object.phpBody;
            if (object.requirements) {
                object.requirements.forEach((occ: any) => {
                    const enginemethodrequirement = occ instanceof EngineMethodRequirement ? occ : new EngineMethodRequirement(occ);
                    this.requirements.push(enginemethodrequirement);
                });
            }
            if (object.uses) {
                object.uses.forEach((occ: any) => {
                    const enginemethodline = occ instanceof EngineMethodLine ? occ : new EngineMethodLine(occ);
                    this.uses.push(enginemethodline);
                });
            }
            this.insurer = (object.insurer instanceof Insurer) ? object.insurer : object.insurer ? new Insurer(object.insurer) : object.insurer;
            this.description = object.description;
        }
        this.postConstruct()
    }

    isArgumentAllowed(arg: EngineArgument) {
        console.log(arg)
    }

}

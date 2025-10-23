/* eslint-disabled */
import Insurer from "./Insurer";
import Branch from "./Branch";
import EngineMethod from "./EngineMethod";
import AvenantTypeExtend from "@/entity/extends/AvenantTypeExtend";

export default class AvenantType extends AvenantTypeExtend {

    public id!: number;
    public label = '';
    public code = '';
    public description? = '';
    public insurers: Array<Insurer> = [];
    public branches: Array<Branch> = [];
    public isUpdatingPremium?: boolean;
    public preUpdateFunction!: EngineMethod;
    public calculationFunction!: EngineMethod;
    public allowAdd!: boolean;
    public allowRemove!: boolean;
    public allowEdit!: boolean;
    public addProperties = [];
    public removeProperties = [];
    public editProperties = [];
    public allowStateUpdate?: boolean;
    public nextAvenantAllowed = [];
    public newStatus? = '';


    constructor(object?: any) {
        super(object)
        if (object) {
            this.id = object.id;
            this.label = object.label;
            this.code = object.code;
            this.description = object.description;
            if (object.insurers) {
                object.insurers.forEach((occ: any) => {
                    const insurer = occ instanceof Insurer ? occ : new Insurer(occ);
                    this.insurers.push(insurer);
                });
            }
            if (object.branches) {
                object.branches.forEach((occ: any) => {
                    const branch = occ instanceof Branch ? occ : new Branch(occ);
                    this.branches.push(branch);
                });
            }
            this.isUpdatingPremium = object.isUpdatingPremium;
            this.preUpdateFunction = (object.preUpdateFunction instanceof EngineMethod) ? object.preUpdateFunction : object.preUpdateFunction ? new EngineMethod(object.preUpdateFunction) : object.preUpdateFunction;
            this.calculationFunction = (object.calculationFunction instanceof EngineMethod) ? object.calculationFunction : object.calculationFunction ? new EngineMethod(object.calculationFunction) : object.calculationFunction;
            this.allowAdd = object.allowAdd;
            this.allowRemove = object.allowRemove;
            this.allowEdit = object.allowEdit;
            this.addProperties = object.addProperties;
            this.removeProperties = object.removeProperties;
            this.editProperties = object.editProperties;
            this.allowStateUpdate = object.allowStateUpdate;
            this.nextAvenantAllowed = object.nextAvenantAllowed;
            this.newStatus = object.newStatus;

        }
        this.postConstruct()
    }

}

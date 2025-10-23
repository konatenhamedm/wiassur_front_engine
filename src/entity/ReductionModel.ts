/* eslint-disabled */
import Branch from "./Branch";
import Reduction from "./Reduction";
import EngineMethod from "./EngineMethod";
import ReductionModelExtend from "@/entity/extends/ReductionModelExtend";

export default class ReductionModel extends ReductionModelExtend {

public id!: number;
public label = '';
public code = '';
public branch!: Branch;
public isEnable!: boolean;
public reductions: Array<Reduction> = [];
public ranking!: number;
public method!: EngineMethod;
public requiredRoles= [];
public deletedAt?: Date;

  constructor (object?: any) {
      super(object)
      if(object){
       this.id= object.id;
       this.label= object.label;
       this.code= object.code;
this.branch = (object.branch instanceof Branch) ? object.branch : object.branch ? new Branch(object.branch) : object.branch;
       this.isEnable= object.isEnable;
       if(object.reductions){
           object.reductions.forEach((occ: any)=>{
               const reduction= occ instanceof Reduction? occ :  new Reduction(occ);
               this.reductions.push(reduction);
           });
       }
       this.ranking= object.ranking;
this.method = (object.method instanceof EngineMethod) ? object.method : object.method ? new EngineMethod(object.method) : object.method;
       this.requiredRoles= object.requiredRoles;
       if(object.deletedAt){
           this.deletedAt= new Date(object.deletedAt);
       }
      }
      this.postConstruct()
  }

}

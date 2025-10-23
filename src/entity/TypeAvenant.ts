/* eslint-disabled */
import Avenant from "./Avenant";
import Branch from "./Branch";
import Feature from "./Feature";
import TypeAvenantExtend from "@/entity/extends/TypeAvenantExtend";
import Insurer from "./Insurer";

export default class TypeAvenant extends TypeAvenantExtend {


public id!: number;
public code = '';
public label = '';
public primeImpact!: boolean;
public allRisks!: boolean;
public avenants: Array<Avenant> = [];
public feature: Array<Feature> = [];
public description? = '';
public lastFunction? = '';
public calculPrimeFunction? = '';
public insurers: Array<{
    label:string,
    id: number,
}> = [];
public branchs: Array<Branch> = [];

  constructor (object?: any) {
      super(object)
      if(object){
        this.id = object.id
       this.code= object.code;
       this.label= object.label;
       this.primeImpact= object.primeImpact;
       this.allRisks= object.allRisks;
       if(object.avenants){
           object.avenants.forEach((occ: any)=>{
               const avenant= occ instanceof Avenant? occ :  new Avenant(occ);
               this.avenants.push(avenant);
           });
       }
       if(object.feature){
           object.feature.forEach((occ: any)=>{
               const feature= occ instanceof Feature? occ :  new Feature(occ);
               this.feature.push(feature);
           });
       }
       if(object.insurers){
        object.insurers.forEach((occ: any)=>{
            const insurer= {
                label: occ.label,
                id: occ.id,
            }
            this.insurers.push(insurer);
        });
    }
    if(object.branchs){
        object.branchs.forEach((occ: any)=>{
            const branch= occ instanceof Branch? occ :  new Branch(occ);
            this.branchs.push(branch);
        });
    }
       this.description= object.description;
       this.lastFunction= object.lastFunction;
       this.calculPrimeFunction= object.calculPrimeFunction;
      }
      this.postConstruct()
  }

}

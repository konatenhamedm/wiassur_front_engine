/* eslint-disabled */
import TypeAvenant from "./TypeAvenant";
import FeatureExtend from "@/entity/extends/FeatureExtend";

export default class Feature extends FeatureExtend {


public id!: number;
public code = '';
public label = '';
public typeAvenants: Array<TypeAvenant> = [];

  constructor (object?: any) {
      super(object)
      if(object){
        this.id= object.id;
       this.code= object.code;
       this.label= object.label;
       if(object.typeAvenants){
           object.typeAvenants.forEach((occ: any)=>{
               const typeavenant= occ instanceof TypeAvenant? occ :  new TypeAvenant(occ);
               this.typeAvenants.push(typeavenant);
           });
       }
      }
      this.postConstruct()
  }

}

/* eslint-disabled */
import PreferenceExtend from "@/entity/extends/PreferenceExtend";

export default class Preference extends PreferenceExtend {

public id!: number;

  constructor (object?: any) {
      super(object)
      if(object){
       this.id= object.id;
      }
  }

}

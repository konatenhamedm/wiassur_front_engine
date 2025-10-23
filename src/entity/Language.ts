/* eslint-disabled */
import Translation from "./Translation";
import LanguageExtend from "@/entity/extends/LanguageExtend";

export default class Language extends LanguageExtend {

public id = '';
public label = '';
public code = '';
public translations: Array<Translation> = [];

  constructor (object?: any) {
      super(object)
      if(object){
       this.id= object.id;
       this.label= object.label;
       this.code= object.code;
       if(object.translations){
           object.translations.forEach((occ: any)=>{
               const translation= occ instanceof Translation? occ :  new Translation(occ);
               this.translations.push(translation);
           });
       }
      }
      this.postConstruct()
  }

}

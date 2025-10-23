/* eslint-disabled */
import LocaleExtend from "@/entity/extends/LocaleExtend";

export default class Locale extends LocaleExtend {

public id!: number;
public iso = '';
public language = '';
public published!: boolean;
public required!: boolean;
public urlCode? = '';
public isTranslatable?: boolean;
public iso639_1? = '';
public iso639_2? = '';
public active!: boolean;

  constructor (object?: any) {
      super(object)
      if(object){
       this.id= object.id;
       this.iso= object.iso;
       this.language= object.language;
       this.published= object.published;
       this.required= object.required;
       this.urlCode= object.urlCode;
       this.isTranslatable= object.isTranslatable;
       this.iso639_1= object.iso639_1;
       this.iso639_2= object.iso639_2;
       this.active= object.active;
      }
      this.postConstruct()
  }

}

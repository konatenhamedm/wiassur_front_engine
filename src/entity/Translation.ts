/* eslint-disabled */
import Translatable from "./Translatable";
import Language from "./Language";
import TranslationExtend from "@/entity/extends/TranslationExtend";

export default class Translation extends TranslationExtend {

public id = '';
public translatable!: Translatable;
public language!: Language;
public content? = '';

  constructor (object?: any) {
      super(object)
      if(object){
       this.id= object.id;
this.translatable = (object.translatable instanceof Translatable) ? object.translatable : object.translatable ? new Translatable(object.translatable) : object.translatable;
this.language = (object.language instanceof Language) ? object.language : object.language ? new Language(object.language) : object.language;
       this.content= object.content;
      }
      this.postConstruct()
  }

}

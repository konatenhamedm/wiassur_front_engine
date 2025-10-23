/* eslint-disabled */
import Survey from "./Survey";
import PlatformExtend from "@/entity/extends/PlatformExtend";

export default class Platform extends PlatformExtend {

public id!: number;
public label = '';
public slug = '';
public baseUrl = '';
public surveys: Array<Survey> = [];

  constructor (object?: any) {
      super(object)
      if(object){
       this.id= object.id;
       this.label= object.label;
       this.slug= object.slug;
       this.baseUrl= object.baseUrl;
       if(object.surveys){
           object.surveys.forEach((occ: any)=>{
               const survey= new Survey(occ);
               this.surveys.push(survey);
           });
       }
      }
  }

}

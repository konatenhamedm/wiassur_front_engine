/* eslint-disabled */
import Tag from "./Tag";
import DataTypeExtend from "@/entity/extends/DataTypeExtend";

export default class DataType extends DataTypeExtend {

public id!: number;
public label = '';
public code = '';
public class? = '';
public format = '';
public tags: Array<Tag> = [];

  constructor (object?: any) {
      super(object)
      if(object){
       this.id= object.id;
       this.label= object.label;
       this.code= object.code;
       this.class= object.class;
       this.format= object.format;
       if(object.tags){
           object.tags.forEach((occ: any)=>{
               const tag= occ instanceof Tag? occ :  new Tag(occ);
               this.tags.push(tag);
           });
       }
      }
      this.postConstruct()
  }

}

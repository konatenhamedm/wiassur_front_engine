/* eslint-disabled */
import RoleExtend from "@/entity/extends/RoleExtend";

export default class Role extends RoleExtend {

public id = '';
public label = '';
public code = '';
public description? = '';

  constructor (object?: any) {
      super(object)
      if(object){
       this.id= object.id;
       this.label= object.label;
       this.code= object.code;
       this.description= object.description;
      }
      this.postConstruct()
  }

}

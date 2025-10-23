/* eslint-disabled */
import Survey from "./Survey";
import Section from "./Section";
import User from "./User";
import StepExtend from "@/entity/extends/StepExtend";

export default class Step extends StepExtend {

public id!: number;
public label = '';
public description? = '';
public icon? = '';
public ranking!: number;
public active?: boolean;
public survey?: Survey;
public sections: Array<Section> = [];
public template? = '';
public uuid = '';
public createdAt?: Date;
public updatedAt?: Date;
public createBy?: User;
public updateBy?: User;
public removeBy?: User;
public createdFromIp? = '';
public updatedFromIp? = '';
public deletedAt?: Date;
public requiredRoles = [];

  constructor (object?: any) {
      super(object)
      if(object){
       this.id= object.id;
       this.label= object.label;
       this.description= object.description;
       this.icon= object.icon;
       this.ranking= object.ranking;
       this.active= object.active;
this.survey = (object.survey instanceof Survey) ? object.survey : new Survey(object.survey);
       if(object.sections){
           object.sections.forEach((occ: any)=>{
               const section= new Section(occ);
               this.sections.push(section);
           });
       }
          this.requiredRoles = object.requiredRoles;

          this.template= object.template;
       this.uuid= object.uuid;
       if(object.createdAt){
           this.createdAt= new Date(object.createdAt);
       }
       if(object.updatedAt){
           this.updatedAt= new Date(object.updatedAt);
       }
this.createBy = (object.createBy instanceof User) ? object.createBy : new User(object.createBy);
this.updateBy = (object.updateBy instanceof User) ? object.updateBy : new User(object.updateBy);
this.removeBy = (object.removeBy instanceof User) ? object.removeBy : new User(object.removeBy);
       this.createdFromIp= object.createdFromIp;
       this.updatedFromIp= object.updatedFromIp;
       if(object.deletedAt){
           this.deletedAt= new Date(object.deletedAt);
       }
      }
  }

}

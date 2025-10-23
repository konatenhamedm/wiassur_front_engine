/* eslint-disabled */
import Branch from "./Branch";
import User from "./User";
import BranchCategoryExtend from "@/entity/extends/BranchCategoryExtend";

export default class BranchCategory extends BranchCategoryExtend {

public id!: number;
public label = '';
public color = '';
public slug = '';
public branches: Array<Branch> = [];
public deletedAt?: Date;
public uuid = '';
public createdAt?: Date;
public updatedAt?: Date;
public createBy?: User;
public updateBy?: User;
public removeBy?: User;
public createdFromIp? = '';
public updatedFromIp? = '';

  constructor (object?: any) {
      super(object)
      if(object){
       this.id= object.id;
       this.label= object.label;
       this.color= object.color;
       this.slug= object.slug;
       if(object.branches){
           object.branches.forEach((occ: any)=>{
               const branch= new Branch(occ);
               branch.category = this ;
               this.branches.push(branch);
           });
       }
       if(object.deletedAt){
           this.deletedAt= new Date(object.deletedAt);
       }
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
      }
  }

}

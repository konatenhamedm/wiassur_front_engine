/* eslint-disable */
import File from "./File";
import User from "./User";

export default class Folder {

public id!: number;
public uuid = '';
public files: Array<File> = [];
public deletedAt?: Date;
public createdAt?: Date;
public updatedAt?: Date;
public createBy?: User;
public updateBy?: User;
public removeBy?: User;
public createdFromIp? = '';
public updatedFromIp? = '';

  constructor (object?: any) {
      if(object){
       this.id= object.id;
       this.uuid= object.uuid;
       if(object.files){
           object.files.forEach((occ: any)=>{
               this.files.push(new File(occ));
           });
       }
       if(object.deletedAt){
           this.deletedAt= new Date(object.deletedAt);
       }
       if(object.createdAt){
           this.createdAt= new Date(object.createdAt);
       }
       if(object.updatedAt){
           this.updatedAt= new Date(object.updatedAt);
       }
       this.createBy= new User( object.createBy);
       this.updateBy= new User( object.updateBy);
       this.removeBy= new User( object.removeBy);
       this.createdFromIp= object.createdFromIp;
       this.updatedFromIp= object.updatedFromIp;
      }
  }

}

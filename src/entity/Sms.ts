/* eslint-disabled */
import SmsExtend from "@/entity/extends/SmsExtend";

export default class Sms extends SmsExtend {

public id = '';
public origin? = '';
public content = '';
public recipients = '';
public sendAt? = '';
public externalId? = '';
public status? = '';
public uuid? = '';
public createdAt?: Date;
public updatedAt?: Date;
public createdFromIp? = '';
public updatedFromIp? = '';
public createBy? = '';

  constructor (object?: any) {
      super(object)
      if(object){
       this.id= object.id;
       this.origin= object.origin;
       this.content= object.content;
       this.recipients= object.recipients;
       this.sendAt= object.sendAt;
       this.externalId= object.externalId;
       this.status= object.status;
       this.uuid= object.uuid;
       if(object.createdAt){
           this.createdAt= new Date(object.createdAt);
       }
       if(object.updatedAt){
           this.updatedAt= new Date(object.updatedAt);
       }
       this.createdFromIp= object.createdFromIp;
       this.updatedFromIp= object.updatedFromIp;
       this.createBy= object.createBy;
      }
      this.postConstruct()
  }

}

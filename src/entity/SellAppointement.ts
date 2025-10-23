/* eslint-disabled */
import SellHandShake from "./SellHandShake";
import SellAppointementExtend from "@/entity/extends/SellAppointementExtend";

export default class SellAppointement extends SellAppointementExtend {

public id = 0;
public dateschedule?: Date;
public dateappointement?: Date;
public status = '';
public handShake!: SellHandShake;
public comment? = '';

  constructor (object?: any) {
      super(object)
      if(object){
       this.id= object.id;
       if(object.dateschedule){
           this.dateschedule= new Date(object.dateschedule);
       }
       if(object.dateappointement){
           this.dateappointement= new Date(object.dateappointement);
       }
       this.status= object.status;
this.handShake = (object.handShake instanceof SellHandShake) ? object.handShake : object.handShake ? new SellHandShake(object.handShake) : object.handShake;
       this.comment= object.comment;
      }
      this.postConstruct()
  }

}

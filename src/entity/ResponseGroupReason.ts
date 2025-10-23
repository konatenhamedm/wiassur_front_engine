/* eslint-disabled */
import Reason from "./Reason";
import ResponseGroup from "./ResponseGroup";
import ResponseGroupReasonExtend from "@/entity/extends/ResponseGroupReasonExtend";

export default class ResponseGroupReason extends ResponseGroupReasonExtend {

public id = '';
public message? = '';
public reason!: Reason;
public responseGroup!: ResponseGroup;

  constructor (object?: any) {
      super(object)
      if(object){
       this.id= object.id;
       this.message= object.message;
this.reason = (object.reason instanceof Reason) ? object.reason : object.reason ? new Reason(object.reason) : object.reason;
this.responseGroup = (object.responseGroup instanceof ResponseGroup) ? object.responseGroup : object.responseGroup ? new ResponseGroup(object.responseGroup) : object.responseGroup;
      }
      this.postConstruct()
  }

}

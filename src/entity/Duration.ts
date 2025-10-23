/* eslint-disabled */
import DurationExtend from "@/entity/extends/DurationExtend";

export default class Duration extends DurationExtend {

public id!: number;
public label = '';
public period = '';
public code = '';
public year = 0;
public month = 0;
public day = 0;

  constructor (object?: any) {
      super(object)
      if(object){
       this.id= object.id;
       this.label= object.label;
       this.period= object.period;
       this.code= object.code;
       this.year= object.year;
       this.month= object.month;
       this.day= object.day;
      }
      this.postConstruct()
  }

}

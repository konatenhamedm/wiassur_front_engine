/* eslint-disabled */
import Prospect from "./Prospect";
import Company from "./Company";
import AdditionalInfoExtend from "@/entity/extends/AdditionalInfoExtend";

export default class AdditionalInfo extends AdditionalInfoExtend {

public id = '';
public label = '';
public value = '';
public type = '';
public prospect!: Prospect;
public company!: Company;
public typeData = '';

  constructor (object?: any) {
      super(object)
      if(object){
       this.id= object.id;
       this.label= object.label;
       this.value= object.value;
       this.type= object.type;
       this.typeData= object.typeData;
       console.log(object.type, 'objrct type');
this.prospect = (object.prospect instanceof Prospect) ? object.prospect : object.prospect ? new Prospect(object.prospect) : object.prospect;
this.company = (object.company instanceof Company) ? object.company : object.company ? new Company(object.company) : object.company;
      }
      this.postConstruct()
  }

}

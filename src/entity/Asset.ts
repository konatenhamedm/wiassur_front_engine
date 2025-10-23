/* eslint-disabled */
import Contract from "./Contract";
import Avenant from "./Avenant";
import AssetExtend from "@/entity/extends/AssetExtend";

export default class Asset extends AssetExtend {

public id!: number;
public src = '';
public type = '';
public name = '';
public contract!: Contract;
public avenant!: Avenant;

  constructor (object?: any) {
      super(object)
      if(object){
       this.id= object.id;
       this.src= object.src;
       this.type= object.type;
       this.name= object.name;
this.contract = (object.contract instanceof Contract) ? object.contract : object.contract ? new Contract(object.contract) : object.contract;
this.avenant = (object.avenant instanceof Avenant) ? object.avenant : object.avenant ? new Avenant(object.avenant) : object.avenant;
      }
      this.postConstruct()
  }

}

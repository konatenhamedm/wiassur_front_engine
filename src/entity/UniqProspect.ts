/* eslint-disabled */
import AdditionalInfo from "./AdditionalInfo";
import Company from "./Company";
import UniqProspectExtend from "@/entity/extends/UniqProspectExtend";
import Prospect from "./Prospect";
import Handshake from "./Handshake";

export default class UniqProspect extends UniqProspectExtend {
  public id = "";
  public name = "";
  public type = "";
  public mobile = "";
  public status = "";
  public company!: Company;
  public additionnalInfo: Array<AdditionalInfo> = [];
  public leads: Array<Prospect> = [];

  public handshakes: Array<Handshake> = [];
  public uuid? = "";
  public createdAt?: Date;
  public updatedAt?: Date;
  public createBy? = "";
  public updateBy? = "";
  public removeBy? = "";
  public createdFromIp? = "";
  public updatedFromIp? = "";

  public manager = "";

  constructor(object?: any) {
    super(object);
    if (object) {
      this.id = object.id;
      this.name = object.name;
      this.type = object.type;
      this.mobile = object.mobile;
      this.status = object.status;
      this.company =
        object.company instanceof Company
          ? object.company
          : object.company
          ? new Company(object.company)
          : object.company;
      this.uuid = object.uuid;
      if (object.additionnalInfo) {
        object.additionnalInfo.forEach((occ: any) => {
          const additionalinfo =
            occ instanceof AdditionalInfo ? occ : new AdditionalInfo(occ);
          this.additionnalInfo.push(additionalinfo);
        });
      }
      if (object.leads) {
        object.leads.forEach((occ: any) => {
          const lead =
            occ instanceof Prospect ? occ : new Prospect(occ);
          this.leads.push(lead);
        });
      }

      if (object.handshakes) {
        object.handshakes.forEach((occ: any) => {
          const handshake =
            occ instanceof Handshake ? occ : new Handshake(occ);
          this.handshakes.push(handshake);
        });
      }
      if (object.createdAt) {
        this.createdAt = new Date(object.createdAt);
      }
      if (object.updatedAt) {
        this.updatedAt = new Date(object.updatedAt);
      }
      this.createBy = object.createBy;
      this.updateBy = object.updateBy;
      this.removeBy = object.removeBy;
      this.createdFromIp = object.createdFromIp;
      this.updatedFromIp = object.updatedFromIp;

      this.manager= object.manager;
    }
    this.postConstruct();
  }
}

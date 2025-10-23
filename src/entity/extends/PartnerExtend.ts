/* eslint-disabled */

import Partner from "@/entity/Partner";
import Contract from "@/entity/Contract";
import Account from "@/entity/Account";

export default class PartnerExtend {


    public agencies: Array<Partner> = [];
    public parent: Partner | undefined = undefined
    public username = '';
    public password = '';
    public email? = '';
    public parentCode = ''

    constructor(object?: any) {
        if (object) {

            this.username = object.username;
            this.password = object.password;
            this.email = object.email;
            this.parentCode = object.parentCode
            if (object.agencies) {
                object.agencies.forEach((occ: any) => {
                    const agency = occ instanceof Partner ? occ : new Partner(occ);
                    this.agencies.push(agency);
                });
            }
            if (object.parent) {
                this.parent = (object.parent instanceof Partner) ? object.parent : object.parent ? new Partner(object.parent) : object.parent;
            }
        }
    }

    postConstruct() {
    }
}

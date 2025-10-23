/* eslint-disabled */

import Popup from "@/entity/Popup";
import Account from "@/entity/Account"
import {helper} from "@/services/Helper";
import Customer from "@/entity/Customer";
import Device from "@/entity/Device";
import Tag from "@/entity/Tag";

export default class CustomerExtend {
    public name? = '';
    public prename? = '';
    public email? = '';
    public civility? = '';
    public fonction? = '';
    public mobile? = ''
    public fixe? = ''
    public contractValue = 0
    public code = 0
    public fullname = ''
    public phone = '';
    public sponsoringCount = 0
    public validatedSponsoringCount = 0
    public verified = 0
    public account!: Account
    public godFather ?: Customer = undefined
    public devices: Array<Device> = [];
    public lastAction?: Date;
    public tags: Array<Tag> = [];
    public roles: string[] = []

    constructor(object?: any) {
        if (object) {
            this.account = new Account(object.account)
            this.contractValue = object.contractValue
            this.code = object.code
            this.phone = object.phone
            this.fullname = object.fullname
            this.sponsoringCount = object.sponsoringCount
            this.validatedSponsoringCount = object.validatedSponsoringCount
            this.verified = object.verified
            this.roles = object.roles
            this.godFather = (object.godFather instanceof Customer) ? object.godFather : object.godFather ? new Customer(object.godFather) : object.godFather;
            if (object.devices) {
                object.devices.forEach((occ: any) => {
                    const device = occ instanceof Device ? occ : new Device(occ);
                    this.devices.push(device);
                });
            }

            if (object.tags) {
                object.tags.forEach((occ: any) => {
                    const tag = occ instanceof Tag ? occ : new Tag(occ);
                    this.tags.push(tag);
                });
            }

            if (object.lastAction) {
                this.lastAction = new Date(object.lastAction);
            }
        }
    }

    isIdentified() {
        return !this.empty(this.civility) && !this.empty(this.name) && !this.empty(this.prename) && !this.empty(this.fonction) && !this.empty('mobile')
    }

    validate() {
        if (this.empty(this.civility)) {
            new Popup('Information manquante', 'Veuillez renseigner la civilité')
            return false;
        }
        if (this.empty(this.name)) {
            new Popup('Information manquante', 'Veuillez renseigner le nom')
            return false;
        }
        if (this.empty(this.prename)) {
            new Popup('Information manquante', 'Veuillez renseigner le prénom')
            return false;
        }
        if (this.empty(this.fonction)) {
            new Popup('Information manquante', 'Veuillez renseigner la fonction')
            return false;
        }

        if (this.empty(this.mobile)) {
            new Popup('Information manquante', 'Veuillez renseigner le numéro mobile')
            return false;
        }

        return true
    }

    useOs(os: string) {
        const index = this.devices.findIndex((d: Device) => {
            return d.type?.toLowerCase() === os.toLowerCase()
        })
        return index !== -1
    }

    postConstruct() {
    }

    get identifier() {
        let identifier = '';
        if (this.prename !== 'null' && !helper.empty(this.prename)) {
            identifier += this.prename
        }
        if (this.name !== 'null' && !helper.empty(this.name)) {
            if (!helper.empty(identifier)) {
                identifier += ' '
            }
            identifier += this.name;
        }
        // identifier = this.prename + ' ' + this.name;
        if (identifier.trim() === '') {
            identifier = this.email
        }
        if (identifier === 'null null') {
            identifier = ''
        }
        return identifier
    }

    empty(data: string | undefined): boolean {
        return data === null || data === undefined || data.length === 0
    }

    hasContact() {
        return !this.empty(this.mobile)
    }

    hasEmail() {
        return !this.empty(this.email)
    }
}

/* eslint-disabled */

import Prospect from "@/entity/Prospect";
import {api} from "@/services/api";
import { helper } from "@/services/Helper";

export default class ProspectExtend {


    constructor(object?: any) {
        if (object) {
            this.identifier = object.identifier
        }
    }

    postConstruct() {
    }

    identifier = '-'

    get photoLink() {
        const self: Prospect = this as any;
        if (self.photo) {
            return api.master + 'uploads/' + self.photo;
        }
        return null
    }

    get isIdentified() {
        const self: Prospect = this as any;
        return !helper.empty(self.name)
    }

}

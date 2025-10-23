/* eslint-disabled */

import {helper} from "@/services/Helper";

export default class PrintableExtend {

    public uuid = helper.generateId()

    constructor(object?: any) {
        if(object){
            this.uuid = object.uuid
        }
    }

    postConstruct() {
    }
}

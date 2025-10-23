/* eslint-disabled */

import SellNotes from "@/entity/SellNotes";
import {helper} from "@/services/Helper";

export default class SellNotesExtend {


    constructor(object?: any) {
    }

    postConstruct() {
        const self: SellNotes = this as any
        if (helper.empty(self.uuid)) {
            self.uuid = helper.generateId()
        }
    }
}

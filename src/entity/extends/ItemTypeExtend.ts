/* eslint-disabled */

import Printable from "@/entity/Printable";

export default class ItemTypeExtend {

    expand: boolean
    entity: any = null
    public printables: Printable[] = []

    constructor(object?: any) {
        this.expand = true
        if (object) {
            this.entity = object.entity

            if (object.printables) {
                object.printables.forEach((occ: any) => {
                    const item = new Printable(occ);
                    this.printables.push(item);
                });
            }
        }
    }

    postConstruct(){}
}

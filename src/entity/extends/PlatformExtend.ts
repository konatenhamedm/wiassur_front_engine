/* eslint-disabled */

import Translatable from "@/entity/Translatable";

export default class PlatformExtend {

    public code = '';
    public translatables: Array<Translatable> = [];

    constructor(object?: any) {
        if (object) {
            this.code = object.code;
            if (object.translatables) {
                object.translatables.forEach((occ: any) => {
                    const translatable = occ instanceof Translatable ? occ : new Translatable(occ);
                    this.translatables.push(translatable);
                });
            }
        }
    }

}

/* eslint-disabled */
import Platform from "./Platform";
import Translation from "./Translation";
import TranslatableExtend from "@/entity/extends/TranslatableExtend";

export default class Translatable extends TranslatableExtend {

    public id = '';
    public platform!: Platform;
    public disabled? = '';
    public code = '';
    public description? = '';
    public translations: Array<Translation> = [];
    public value = ''

    constructor(object?: any) {
        super(object)
        if (object) {
            this.id = object.id;
            this.platform = (object.platform instanceof Platform) ? object.platform : object.platform ? new Platform(object.platform) : object.platform;
            this.disabled = object.disabled;
            this.code = object.code;
            this.value = object.value;
            this.description = object.description;
            if (object.translations) {
                object.translations.forEach((occ: any) => {
                    const translation = occ instanceof Translation ? occ : new Translation(occ);
                    this.translations.push(translation);
                });
            }
        }
        this.postConstruct()
    }

    getTransition(lang: string) {
        for (let transition of this.translations) {
            if (transition.language.code === lang) {
                return transition
            }
        }
        return null;
    }

}

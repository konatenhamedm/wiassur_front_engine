/* eslint-disabled */
import PrintableExtend from "@/entity/extends/PrintableExtend";

export default class Printable extends PrintableExtend {

    public id!: number;
    public label = '';
    public template? = '';
    public private = false;

    constructor(object?: any) {
        super(object)
        if (object) {
            this.id = object.id;
            this.label = object.label;
            this.template = object.template;
            this.private = object.private
        }
        this.postConstruct()
    }

}

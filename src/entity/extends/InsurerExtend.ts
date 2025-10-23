/* eslint-disabled */

export default class InsurerExtend {

    public engineClassname = ''
    public color = ''

    constructor(object?: any) {
        if (object) {
            this.engineClassname = object.engineClassname
        }
    }

    postConstruct() {
    }
}

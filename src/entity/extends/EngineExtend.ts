/* eslint-disabled */

export default class EngineExtend {


    public name = ''
    public branchSlug = ''
    public model = ''

    constructor(object?: any) {
        if (object) {
            this.name = object.name
            this.branchSlug = object.branchSlug
        }
    }

    postConstruct() {
    }
}

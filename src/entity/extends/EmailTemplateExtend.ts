/* eslint-disabled */

export default class EmailTemplateExtend {


    html = ''
    text = ''

    constructor(object?: any) {
        if (object) {
            this.html = object.html
            this.text = object.text
        }
    }

    postConstruct() {
    }
}

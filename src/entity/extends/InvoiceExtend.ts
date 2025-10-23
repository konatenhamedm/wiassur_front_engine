/* eslint-disabled */

export default class InvoiceExtend {

  balance = 0

  constructor(object?: any) {
    if (object) {
      this.balance = object.balance
    }
  }

  postConstruct() {
  }
}

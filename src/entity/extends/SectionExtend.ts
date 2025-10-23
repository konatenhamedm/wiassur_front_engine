/* eslint-disabled */

import Section from "@/entity/Section";
import Question from "@/entity/Question";
import Step from "@/entity/Step";

export default class SectionExtend {
  expandable = false;
  constructor(object?: any) {
    if (object) {
      this.expandable = object.expandable;
    }
  }

  getQuestions(): Question[] {
    const self: Section = this as any;
    let qs: Question[] = [];
    self.questions.forEach((s: Question) => {
      qs = qs.concat(s);
    });
    return qs;
  }

  isVisible() {
    const self: Section = this as any;
    let showCount = 0;
    self.questions.forEach((q: Question) => {
      // console.log('from section')
      if (q.isVisible()) {
        showCount++;
      }
    });
    return showCount > 0;
  }

  validate() {

    const self: Section = this as any;
    const isValid = self.questions.every((question: Question) => {
      return question.validateCurrent();
    });

    return isValid;
  }
}

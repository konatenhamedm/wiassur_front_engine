/* eslint-disabled */

import Survey from "@/entity/Survey";
import Question from "@/entity/Question";
import Section from "@/entity/Section";
import Step from "@/entity/Step";

export default class SurveyExtend {


    itemUuid = ''

    constructor(object?: any) {
        if (object) {
            this.itemUuid = object.item
        }
    }


    getQuestions() {
        const self: Survey = this as any
        let qs: Question[] = []
        self.steps.forEach((s: Step) => {
            qs = qs.concat(s.getQuestions())
        })
        return qs
    }

    getPosition(question: Question) {
        let position = 0
        const self: Survey = this as any
        for (let step of self.steps) {
            for (let section of step.sections) {
                for (let q of section.questions) {
                    if (q.uuid === question.uuid) {
                        return position
                    }
                    position++
                }
            }
        }

    }

    postConstruct() {

    }

}

/* eslint-disabled */

import Step from "@/entity/Step";
import Section from "@/entity/Section";
import Question from "@/entity/Question";
import {helper} from "@/services/Helper";
import {auth} from "@/services/Auth";

export default class StepExtend {
    public template? = '';
    isValid = false

    constructor(object?: any) {
        this.template = 'default'
    }

    getQuestions(): Question[] {
        const self: Step = this as any
        let qs: Question[] = []
        self.sections.forEach((s: Section) => {
            qs = qs.concat(s.getQuestions())
        })
        return qs;
    }

    isVisible() {
        const self: Step = this as any
        let visible = false;
        if (!helper.empty(self.requiredRoles)) {
            let accessGranted = auth.checkRoleTabs(self.requiredRoles);
            if (accessGranted) {
                visible = true;
            }
        } else {
            visible = true;
        }

        if(!visible){
            return false
        }
        const isVisible = self.sections.some((section: Section) => {
            return section.isVisible()
        })
        // console.log(self.id + ' ' + self.label + ' is visible ' + isVisible)
        return isVisible
    }

    validate() {
        const self: Step = this as any
        this.isValid = self.sections.every((section: Section) => {
            return section.validate()
        })
        return this.isValid
    }
}

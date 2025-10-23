/* eslint-disabled */

import Survey from "@/entity/Survey";
import {helper} from "@/services/Helper";
import ResponseGroup from "@/entity/ResponseGroup";
import store from "@/store";
import Step from "@/entity/Step";
import Section from "@/entity/Section";
import Question from "@/entity/Question";
import Response from "@/entity/Response";

export default class ResponseGroupExtend {


    public isSecure = false
    public surveySlug = ''
    public branchSlug = ''
    public logs = []
    public aliases: any[] = []
    public rgParent: any = null
    potentialOwners: any[] = []
    state = 0
    expand = false

    constructor(object?: any) {
        if (object) {
            this.isSecure = object.isSecure
            this.surveySlug = object.surveySlug
            this.branchSlug = object.branchSlug
            this.rgParent = object.rgParent
            this.potentialOwners = object.potentialOwners
            this.aliases = object.aliases
        }
    }

    public postConstruct() {
    }

    getResponseForQuestion(question: Question) {
        const self: ResponseGroup = this as any
        for (let response of self.responses) {
            if (response.question && response.questionUuid === question.uuid) {
                return response;
            }
        }

        return null
    }

    get defaultAlias() {
        // console.log(this.aliases)
        const self: ResponseGroup = this as any
        if (!helper.empty(self.alias)) {
            return self.alias
        }
        return null
    }


    getStateDetails(report: any = null, maxStepIndex: any = null) {

        const self: ResponseGroup = this as any
        if (!self || !self.survey) {
            return
        }
        const surveyUuid: any = self.survey.uuid
        const rg: ResponseGroup = new ResponseGroup(this.simplify())
        // console.log(surveyUuid)
        let survey: Survey | null = null
        const surveyIndex = store.state.surveys.findIndex((saved: Survey) => {
            return saved.uuid === surveyUuid
        })

        if (surveyIndex !== -1) {
            survey = new Survey(store.state.surveys[surveyIndex])
        }
        if (!survey) {
            // console.log('survey ' + surveyUuid + ' not found')
            return
        }

        // console.log(survey)
        let questionCount = 0;
        let requiredCount = 0;
        let missingRequired = 0;
        let responseCount = 0;
        let percent = 0;
        let first = false;
        if (report === null) {
            first = true;
            report = {}
        }
        const index = survey.slug + '_' + rg.uuid;
        let subs: any[] = [];
        for (let [stepIndex, step] of survey.steps.entries()) {
            // console.log('max '+maxStepIndex)
            // console.log('current '+step.label+' => '+stepIndex)
            for (let section of step.sections) {
                for (let question of section.questions) {
                    let response: Response | null = rg.getResponseForQuestion(question)
                    if (question.type.code.match(/OBJECT/)) {
                        if (!response) {
                            response = new Response()
                            response.question = question
                            question.response = response
                            rg.responses.push(response)
                        }
                        question.response = response
                        if (question.min) {
                            let missing = question.min
                            response.responseGroups.forEach((responseGroup: ResponseGroup) => {
                                missing--
                                const result = responseGroup.getStateDetails();
                                const index: any = survey!.slug + '_' + responseGroup.uuid
                                subs[index] = result
                            })
                            if (missing > 0) {
                                for (let i = 0; i < missing; i++) {
                                    const responseGroup = new ResponseGroup()
                                    responseGroup.uuid = helper.generateId()
                                    response.responseGroups.push(responseGroup)
                                    responseGroup.parent = response
                                    // responseGroup.survey
                                    // console.log('SURVEY MISSING SHOULD ADD RG AND RECALCULATE PERCENT')
                                    // console.log(question)
                                    const result = responseGroup.getStateDetails();
                                    const index: any = survey!.slug + '_' + responseGroup.uuid
                                    subs[index] = result
                                }
                            }
                        }
                    } else {
                        // console.log('from rgextend')
                        if (question.isVisible()) {
                            questionCount++
                            if (question.required) {
                                requiredCount++
                            }
                            if (response) {
                                question.response = response
                                question.validate()
                                if (!helper.empty(response.value) && question.required && question.isValid) {
                                    if (maxStepIndex !== null) {
                                        if (stepIndex <= maxStepIndex) {
                                            responseCount++
                                        }
                                    } else {
                                        responseCount++
                                    }
                                }
                            } else {
                                missingRequired++
                            }
                        }
                    }
                }
            }
        }

        let qc = questionCount
        let rc = requiredCount
        let rsC = responseCount
        subs.forEach((sub: any) => {
            questionCount += sub.questionCount
            requiredCount += sub.requiredCount
            responseCount += sub.responseCount
        })
        if (requiredCount > 0) {
            // console.log(responseCount + " * " + 100 + " / " + requiredCount)
            percent = Math.floor((responseCount * 100) / requiredCount)
        } else {
            // console.log('no required')
            percent = 100
        }

        const data = {
            'ownQuestionCount': qc,
            'ownRequiredCount': rc,
            'ownResponseCount': rsC,
            'questionCount': questionCount,
            'requiredCount': requiredCount,
            'responseCount': responseCount,
            'percent': percent,
            // 'parent' : $this->getParent() ? $this->getParent()->getQuestion()->getSection()->getStep()->getSurvey()->getSlug() . ' ' .$this->getParent()->getResponseGroup()->getUuid() : null,
            'subs': subs
        };
        // console.log(data)
        if (!maxStepIndex) {
            this.state = data['percent']
        }
        report[index] = data
        // console.log(report)
        return report;
    }


    updateState() {
        const self: ResponseGroup = this as any
        const report: any[] = this.getStateDetails();
        // console.log(this.state)
        // const index: any = this.surveySlug + '_' + self.uuid;
        // this.state = Math.round(report[index]['percent']);
        // if (this.state > 100) {
        //     this.state = 100;
        // }
        // if (this.rgParent instanceof Response) {
        //     // this.getParent()->getResponseGroup()->updateState()
        // }
        return this;
    }

    getPercentState() {
        // const self: ResponseGroup = this as any
        const report: any[] = this.getStateDetails();
        console.log(report)
    }


    // public isSecure = false
    // public surveySlug = ''
    // public branchSlug = ''
    // public logs = []
    // public aliases: any[] = []
    // public rgParent: any = null
    // potentialOwners: any[] = []
    // state = 0

    simplify() {
        const self: ResponseGroup = this as any
        const resume = {
            id: self.id,
            uuid: self.uuid,
            isSecure: self.isSecure,
            surveySlug: self.surveySlug,
            branchSlug: self.branchSlug,
            logs: self.logs,
            aliases: self.aliases,
            rgParent: self.rgParent,
            parent: self.parent ? self.parent.simplify() : null,
            status: self.status,
            alias: self.alias,
            potentialOwners: self.potentialOwners,
            state: self.state,
            responses: [] as any[]
        }

        self.responses.forEach((r: Response) => {
            resume.responses.push(r.simplify())
        })

        return resume
    }


}

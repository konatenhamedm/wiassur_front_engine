/* eslint-disabled */

import Response from "@/entity/Response";
import Tag from "@/entity/Tag";
import {api} from "@/services/api";
import Question from "@/entity/Question";
import {helper} from "@/services/Helper";
import Popup from "@/entity/Popup";
import store from "@/store";
import ResponseGroup from "@/entity/ResponseGroup";
import {auth} from "@/services/Auth";
import Step from "@/entity/Step";
import Section from "@/entity/Section";
import QuestionType from "@/entity/QuestionType";
import DataType from "@/entity/DataType";
import Survey from "@/entity/Survey";

export default class QuestionExtend {

    visibility = 'PUBLIC'
    response = new Response()
    message: any = null
    isValid = false
    isSending = false
    public surveySlug = ''
    public branchSlug = ''
    public genId = helper.generateId()
    public ariane: any[] = []
    public sent: any = null
    public type!: DataType;
    public mapped = false

    constructor(object?: any) {
        if (object) {
            this.surveySlug = object.surveySlug
            this.branchSlug = object.branchSlug
            this.type = (object.type instanceof QuestionType) ? object.type : new DataType(object.type);
        }
        if (object && object.response) {
            this.response = new Response(object.response)
        }
    }

    postConstruct() {
        const self: Question = this as any


        if (self.defaultValue && helper.empty(self.response.value)) {
            // self.response.value = self.defaultValue
        }
        if (self.response.value) {
            // console.log(this.hasChange())
            self.response.currentValue = self.response.value
        }
        // if (!helper.empty(self.response.uuid)) {
        //     console.log(self.response)
        // }
        //         if (self.type && self.type.code.match(/RADIO/)) {
        //             // console.log(self.response)
        // //     console.log(self.label)
        // //     console.log(self.defaultValue)
        // //     console.log(self.response.value)
        //         }
        this.response.questionUuid = self.uuid
        this.validate()
    }

    async setDefaultValue(rg: any = null) {
        const self: Question = this as any
        if (!helper.empty(self.defaultValue) && helper.empty(self.response.value)) {
            // console.log('setting default value ' + self.label + ' = ' + self.defaultValue)
            self.response.value = self.defaultValue
            if (rg instanceof ResponseGroup) {
                self.response.responseGroup = rg
            }
            if (this.hasChange()) {
                // console.log('update default')
                await this.updateAnswer(true)
                store.commit('checkStepValidation')
            }
        }
    }

    getQuestions() {
        const self: Question = this as any

        if (self.type.code.match(/OBJECT/) && self.survey) {
            const questions = self.survey.getQuestions()

            questions.push(self)
            return questions
        } else {
            return [self]
        }
    }

    typeHasTag(tag: string) {
        let found = false;
        (this as any).type.tags.forEach((t: Tag) => {
            if (t.label === tag) {
                found = true;
            }
        })
        return found;
    }

    hasTag(tag: string) {
        const self: Question = this as any
        let found = false;
        self.tags.forEach((t: Tag) => {
            if (t.label === tag) {
                found = true;
            }
        })
        return found;
    }

    hasChange(): boolean {
        const self: Question = this as any
        if (self.type.code === 'NUMBER') {
            if (!Number.isInteger(parseFloat(self.response.value as any))) {
                const newValue = this.convertFloatToInteger(parseFloat(self.response.value as any))
                const currentValue = this.convertFloatToInteger(parseFloat(self.response.currentValue as any))
                return newValue !== currentValue
            }
        }
        return self.response.currentValue !== self.response.value;
    }

    convertFloatToInteger(value: number) {
        let s: any = '' + value
        if (s.includes('.')) {
            s = s.split('.')
            const decimalCount = s.slice(-1).length
            const multiplicator = Math.pow(10, decimalCount)
            return parseFloat(value as any) * multiplicator
        }
        return value;
    }

    isAuthorized() {
        const self: Question = this as any

        if (self.visibility !== 'PUBLIC') {
            if (!auth.hasRole('ROLE_' + self.visibility)) {
                return false
            }
        }

        // if (self.requiredRoles && self.requiredRoles.length > 0) {

        //     console.log('edition up' ,self.visibility )
        //     if (!auth.hasRole('ROLE_' + self.visibility)) {

        //         console.log('edition down')
        //         return false
        //     }
        // }



        if (!helper.empty(self.requiredRoles)) {
            let accessGranted = auth.checkRoleTabs(self.requiredRoles);

            if (!accessGranted) {
                return false;
            }
        }
        return true
    }

    isVisible() {
        const self: Question = this as any


        // if (self.visibility !== 'PUBLIC') {
        //     if (!auth.hasRole('ROLE_' + self.visibility)) {
        //         console.log('hide question '+self.label)
        //         return false
        //     }
        // }



        const survey: Survey = store.state.currentSurvey
        const rg: ResponseGroup = store.state.currentResponseGroup
        let decision = null
        // console.log('----------------'+self.label)
        for (let conditionGroup of self.conditionGroups) {
            let cg = true
            for (let condition of conditionGroup.conditions) {
                const testingQuestion: Question = survey.getQuestions().find((q: Question) => {
                    return q.uuid === condition.testingQuestion
                }) as any
                if (testingQuestion && testingQuestion.response && testingQuestion.response.value) {
                    // console.log(testingQuestion.label + ' ' + condition.operator + ' ' + condition.value)
                    // console.log(testingQuestion.response.value)
                    switch (condition.operator) {
                        case '===': {
                            cg = cg && testingQuestion.response.value!.toUpperCase()
                                === condition.value!.toUpperCase()
                            break;
                        }
                        case '!==': {
                            cg = cg && testingQuestion.response.value!.toUpperCase() !== condition.value!.toUpperCase()
                            break;
                        }
                        case '<': {
                            cg = cg && parseFloat(testingQuestion.response.value!) < parseFloat(condition.value)
                            break;
                        }
                        case '<=': {
                            cg = cg && parseFloat(testingQuestion.response.value!) <= parseFloat(condition.value)
                            break;
                        }
                        case '>': {
                            cg = cg && parseFloat(testingQuestion.response.value!) > parseFloat(condition.value)
                            break;
                        }
                        case '>=': {
                            cg = cg && parseFloat(testingQuestion.response.value!) >= parseFloat(condition.value)
                            break;
                        }
                    }
                    // console.log(testingQuestion.label + ' ' + condition.operator + ' ' + condition.value)
                    // console.log('value is ' + testingQuestion.response.value)
                } else {
                    cg = false
                    // console.error('TESTING QUESTION NOT FOUND FOR ' + self.label)
                }

            }
            decision = decision === null ? cg : decision || cg;
        }

        if (decision === null) {
            decision = true
        }
        // if (!decision) {
        //     console.log('masquer ' + self.label)
        // }


       



        return decision
    }

    isVisibleIn(survey: Survey, rg: ResponseGroup) {
        const self: Question = this as any
        let decision = null
        // console.log('----------------'+self.label)
        for (let conditionGroup of self.conditionGroups) {
            let cg = true
            for (let condition of conditionGroup.conditions) {
                const testingQuestion: Question = survey.getQuestions().find((q: Question) => {
                    return q.uuid === condition.testingQuestion
                }) as any
                if (testingQuestion) {
                    if (testingQuestion.response && testingQuestion.response.value) {

                    } else {
                        const res = rg.responses.find((r: Response) => {
                            return r.question?.uuid === testingQuestion.uuid
                        })
                        if (res) {
                            testingQuestion.response = res
                        }
                    }
                }
                if (testingQuestion && testingQuestion.response && testingQuestion.response.value) {
                    // console.log(testingQuestion.label + ' ' + condition.operator + ' ' + condition.value)
                    // console.log(testingQuestion.response.value)
                    switch (condition.operator) {
                        case '===': {
                            cg = cg && testingQuestion.response.value!.toUpperCase()
                                === condition.value!.toUpperCase()
                            break;
                        }
                        case '!==': {
                            cg = cg && testingQuestion.response.value!.toUpperCase() !== condition.value!.toUpperCase()
                            break;
                        }
                        case '<': {
                            cg = cg && parseFloat(testingQuestion.response.value!) < parseFloat(condition.value)
                            break;
                        }
                        case '<=': {
                            cg = cg && parseFloat(testingQuestion.response.value!) <= parseFloat(condition.value)
                            break;
                        }
                        case '>': {
                            cg = cg && parseFloat(testingQuestion.response.value!) > parseFloat(condition.value)
                            break;
                        }
                        case '>=': {
                            cg = cg && parseFloat(testingQuestion.response.value!) >= parseFloat(condition.value)
                            break;
                        }
                    }
                    // console.log(testingQuestion.label + ' ' + condition.operator + ' ' + condition.value)
                    // console.log('value is ' + testingQuestion.response.value)
                } else {
                    cg = false
                    // console.error('TESTING QUESTION NOT FOUND FOR ' + self.label)
                }

            }
            decision = decision === null ? cg : decision || cg;
        }

        if (decision === null) {
            decision = true
        }
        // if (!decision) {
        //     console.log('masquer ' + self.label)
        // }

        return decision
    }

    async updateAnswer(isDefault: boolean = false) {
        const self: Question = this as any
        const savedValue = this.response.currentValue
        // return
        // console.log(self.response)
        return new Promise((resolve) => {
            
            if (self.response.currentValue !== self.response.value && this.sent !== self.response.value) {
                this.validate()
                if (this.isValid && this.hasChange()) {
                    this.isSending = true
                    if (!self.response.responseGroup) {
                        resolve(null)
                    }
                    const data = {
                        questionUuid: self.uuid,
                        rgUuid: self.response.responseGroup!.uuid,
                        value: self.response.value,
                        responseUuid: self.response.uuid
                    }
                    this.sent = this.response.value
                    self.response.currentValue = self.response.value
                    store.commit('responseSaved')
                    api.saveResponse(data, (res: any) => {
                        // console.log(res)
                        if (res && res.data && res.data.status === 'success') {


                            const response = res.data.responses.find((r: any) => {
                                if (r.deletions) {
                                    r.deletions.forEach((uuid: string) => {
                                        store.commit('removeResponse', uuid)
                                    })
                                }
                                return r.rgUuid === data.rgUuid && r.questionUuid === data.questionUuid
                            })
                            if (response.status === 'success' && response.response) {
                                self.response.uuid = response.response.uuid
                                self.response.currentValue = response.response.value
                                self.response.questionUuid = self.uuid
                                store.commit('addResponse', self)
                                if (!isDefault) {
                                    store.commit('responseSaved')
                                    store.commit('onlineResponseSaved')
                                }
                            } else {
                                // console.log('response is not ok')
                                self.response.value = savedValue
                                self.response.currentValue = savedValue
                                this.isValid = false
                                store.commit('responseSaved')
                                store.commit('onlineResponseSaved')
                                if (!helper.empty(response.message)) {
                                    const p = new Popup('Erreur', response.message, 'danger', 'fad fa-exclamation')
                                    this.message = response.message
                                    

                                    setTimeout(() => {
                                        p.hide()
                                    }, 5000)
                                }
                            }
                        } else {
                            // console.log('nok2')
                            self.response.value = savedValue
                            self.response.currentValue = savedValue
                            this.isValid = false
                            store.commit('responseSaved')
                        }
                        this.isSending = false
                        resolve(null)
                    })
                } else {
                    if (!this.isValid) {
                        console.log(self.label + ' not valid')
                    }
                    if (self.response.currentValue === self.response.value) {
                        console.log(self.label + ' no change')
                    }
                    resolve(null)
                }
            } else {
                resolve(null)
            }
        })
    }


    validate() {
    const self: Question = this as any;
    this.message = null;

    // Cas MultipleSurvey
    if (self.type && self.type.code === 'MULTIPLE_SURVEY') {
        console.log(self.response)
      if (!self.response || !self.response.responseGroups || self.response.responseGroups.length === 0) {
        this.message = 'Aucun sous-groupe de réponse';
        this.isValid = false;
      } else if (!self.response.responseGroups.every((rg: any) => rg.state === 100)) {
        this.message = 'Toutes les sous-réponses doivent être complètes (100%)';
        this.isValid = false;
      } else {
        this.isValid = true;
      }
      return this.isValid;
    }

        // const self: Question = this as any
        // this.message = null
        // @ts-ignore
        if (this.required && helper.empty(this.response.value)) {
            this.message = 'Ce champs est réquis'
        }
        if (this.message === null) {
            this.isValid = true
        } else {
            this.isValid = false
        }
        if (self.type && self.type.code === 'DATE') {
            if (!helper.isValidDate(this.response.value)) {
                this.message = 'Date invalide'
                this.isValid = false
            }
        }

        // if(!this.isValid){
        //     console.log(this.response.value)
        //     console.log(self.label+' is not valid')
        // }
        return this.isValid
    }

    validateCurrent() {
        let valid = false
        const self: Question = this as any
        if (!self.isVisible()) {
            return true
        }
        this.message = null

        // console.log(self.type.code)
        // Cas MultipleSurvey
        if (self.type && self.type.code === 'OBJECT_GROUP') {
            if (!self.response || !self.response.responseGroups || self.response.responseGroups.length === 0) {
                this.message = 'Aucun sous-groupe de réponse'
                return false
            }
            if (!self.response.responseGroups.every((rg: any) => rg.state === 100)) {
                this.message = 'Toutes les sous-réponses doivent être complètes (100%)'
                return false
            }
            return true
        }

        // let valid = false
        // const self: Question = this as any
        // if (!self.isVisible()) {
        //     return true
        // }
        // console.log(self.label)
        this.message = null
        if (this.isSending) {
            this.message = 'La réponse a ' + self.label + ' est en cours de synchronisation'
            return false
        }
        // console.log(this.response.currentValue)
        // console.log(this.response)
        // @ts-ignore
        if (this.required && helper.empty(this.response.currentValue)) {
            this.message = 'Ce champs est réquis'
        }
        if (self.type && self.type.code === 'DATE') {
            if (!helper.isValidDate(this.response.currentValue)) {
                this.message = 'Date invalide'
            }
        }

        if (this.message === null) {
            valid = true
        } else {
            console.log('la réponse a la question '+self.label+' est invalide')
            valid = false
        }
        // console.log(this.message)
        return valid
    }


    comeBefore(question: Question) {
        console.log('////////////////')
        console.log(this)
        console.log(question)

    }

    save() {

    }


}

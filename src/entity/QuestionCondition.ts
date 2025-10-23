/* eslint-disabled */
import Question from "./Question";
import QuestionConditionExtend from "@/entity/extends/QuestionConditionExtend";
import QuestionConditionGroup from "@/entity/QuestionConditionGroup";

export default class QuestionCondition extends QuestionConditionExtend {

    public id!: number;
    public questionGroup!: QuestionConditionGroup;
    public value = '';
    public operator = '===';
    public testingQuestion!: string;

    constructor(object?: any) {
        super(object)
        if (object) {
            this.id = object.id;
            this.questionGroup = (object.questionGroup instanceof QuestionConditionGroup) ? object.questionGroup : new QuestionConditionGroup(object.questionGroup);
            this.value = object.value;
            this.operator = object.operator;
            this.testingQuestion = object.testingQuestion;
            if(object.question && !object.testingQuestion){
                this.testingQuestion = object.question
            }
        }
        this.postConstruct()
    }

}

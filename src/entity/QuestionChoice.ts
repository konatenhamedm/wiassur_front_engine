/* eslint-disabled */
import Question from "./Question";
import QuestionChoiceExtend from "@/entity/extends/QuestionChoiceExtend";
import {helper} from "@/services/Helper";

export default class QuestionChoice extends QuestionChoiceExtend {

    public id!: number;
    public label = '';
    public code = '';
    public question?: Question;
    public icon? = '';
    public description = ''
    public isForm = false
    public uuid = helper.generateId()

    constructor(object?: any) {
        super(object)
        if (object) {
            this.id = object.id;
            this.label = object.label;
            this.code = object.code;
            this.description = object.description;
            this.question = (object.question instanceof Question) ? object.question : new Question(object.question);
            this.icon = object.icon;
        }
    }

}

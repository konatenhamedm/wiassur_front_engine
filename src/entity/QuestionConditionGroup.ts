/* eslint-disabled */
import QuestionCondition from "./QuestionCondition";
import Question from "./Question";
import QuestionConditionGroupExtend from "@/entity/extends/QuestionConditionGroupExtend";

export default class QuestionConditionGroup extends QuestionConditionGroupExtend {

public id!: number;
public conditions: Array<QuestionCondition> = [];
public question!: Question;

  constructor (object?: any) {
      super(object)
      if(object){
       this.id= object.id;
       if(object.conditions){
           object.conditions.forEach((occ: any)=>{
               const questioncondition= occ instanceof QuestionCondition? occ :  new QuestionCondition(occ);
               this.conditions.push(questioncondition);
           });
       }
this.question = (object.question instanceof Question) ? object.question : new Question(object.question);
      }
      this.postConstruct()
  }

}

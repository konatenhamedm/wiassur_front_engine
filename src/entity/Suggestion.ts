/* eslint-disabled */
import Question from "./Question";
import SuggestionExtend from "@/entity/extends/SuggestionExtend";

export default class Suggestion extends SuggestionExtend {

  public id!: number;
  public label = '';
  public code = '';
  public icon?= '';
  public question!: Question;
  public ranking?: number
  constructor(object?: any) {
    super(object)
    if (object) {
      this.id = object.id;
      this.label = object.label;
      this.code = object.code;
      this.icon = object.icon;
      this.ranking = object.ranking
      this.question = (object.question instanceof Question) ? object.question : new Question(object.question);
    }
    this.postConstruct()
  }

}

/* eslint-disabled */
import Question from "./Question";
import Tag from "./Tag";
import QuestionTypeExtend from "@/entity/extends/QuestionTypeExtend";

export default class QuestionType extends QuestionTypeExtend {

public id!: number;
public label = '';
public code = '';
public class? = '';
public questions: Array<Question> = [];
public tags: Array<Tag> = [];

  constructor (object?: any) {
      super(object)
      if(object){
       this.id= object.id;
       this.label= object.label;
       this.code= object.code;
       this.class= object.class;
       if(object.questions){
           object.questions.forEach((occ: any)=>{
               const question= new Question(occ);
               this.questions.push(question);
           });
       }
       if(object.tags){
           object.tags.forEach((occ: any)=>{
               const tag= new Tag(occ);
               this.tags.push(tag);
           });
       }
      }
  }

}

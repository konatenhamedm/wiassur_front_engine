/* eslint-disabled */
import Question from "./Question";
import TagExtend from "@/entity/extends/TagExtend";

export default class Tag extends TagExtend {

public id!: number;
public label = '';
public questions: Array<Question> = [];
public type = '';
public code = '';
public class? = '';

  constructor (object?: any) {
      super(object)
      if(object){
       this.id= object.id;
       this.label= object.label;
       if(object.questions){
           object.questions.forEach((occ: any)=>{
               const question= occ instanceof Question? occ :  new Question(occ);
               this.questions.push(question);
           });
       }
       this.type= object.type;
       this.code= object.code;
       this.class= object.class;
      }
      this.postConstruct()
  }

}

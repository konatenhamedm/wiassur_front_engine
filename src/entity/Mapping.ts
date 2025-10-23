/* eslint-disabled */
import Question from "./Question";
import Survey from "./Survey";
import MappingExtend from "@/entity/extends/MappingExtend";

export default class Mapping extends MappingExtend {

    public id!: number;
    public questionUuid = '';
    public question!: Question;
    public propertyUuid = '';
    public survey!: Survey;
    public propertyCode? = '';
    public propertyLink? = '';
    public itemCode? = '';
    public ranking = 0

    constructor(object?: any) {
        super(object)
        if (object) {
            this.id = object.id;
            this.question = (object.question instanceof Question) ? object.question : new Question(object.question);
            this.propertyUuid = object.propertyUuid;
            this.questionUuid = object.questionUuid;
            this.ranking = object.ranking;
            this.survey = (object.survey instanceof Survey) ? object.survey : new Survey(object.survey);
            this.propertyCode = object.propertyCode;
            this.propertyLink = object.propertyLink;
            this.itemCode = object.itemCode;
        }
        this.postConstruct()
    }

}

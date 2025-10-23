/* eslint-disabled */
import QuestionChoice from "./QuestionChoice";
import Section from "./Section";
import Response from "./Response";
import Survey from "./Survey";
import QuestionExtend from "@/entity/extends/QuestionExtend";
import Tag from "@/entity/Tag";
import QuestionCondition from "@/entity/QuestionCondition";
import QuestionConditionGroup from "@/entity/QuestionConditionGroup";
import Suggestion from "./Suggestion";

export default class Question extends QuestionExtend {
  public id!: number;
  public label = "";
  public description? = "";
  public errorMessage? = "";
  public regex? = "";
  public required?: boolean;
  public fullscreen?: boolean;
  public ranking!: number;
  public placeholder? = "";
  public prefix? = "";
  public suffix? = "";
  public image?: string;
  public internalLabel? = "";
  public defaultValue? = "";
  public choices: Array<QuestionChoice> = [];
  public visibility = "";
  public section!: Section;
  public allowMultiplicator?: boolean;
  public min?: number;
  public max?: number;
  public responses: Array<Response> = [];
  public tags: Array<Tag> = [];
  public survey?: Survey;
  public isInline?: boolean;
  public allowBroadcast?: boolean;
  public link = "";
  public extensionAccepted? = "";
  public uuid = "";
  public eventMessage? = "";
  public createdAt?: Date;
  public updatedAt?: Date;
  public createBy? = "";
  public updateBy? = "";
  public removeBy? = "";
  public createdFromIp? = "";
  public updatedFromIp? = "";
  public conditionGroups: Array<QuestionConditionGroup> = [];
  public questionConditions: Array<QuestionCondition> = [];
  public suggestions: Array<Suggestion> = [];
  public hidden = false;
  public requiredRoles = [];
  public subscriptionMode?: 'full' | 'role_based' | 'disabled' | null;
  public allowedSubscriptionRoles = [];
  public allowedSelectionRoles = [];

  constructor(object?: any) {
    super(object);
    if (object) {
      this.id = object.id;
      this.label = object.label;
      this.description = object.description;
      this.errorMessage = object.errorMessage;
      this.regex = object.regex;
      this.required = object.required;
      this.ranking = object.ranking;
      this.placeholder = object.placeholder;
      this.prefix = object.prefix;
      this.suffix = object.suffix;
      this.fullscreen = object.fullscreen;
      this.link = object.link;
      this.internalLabel = object.internalLabel;
      this.defaultValue = object.defaultValue;
      this.hidden = object.hidden;
      this.image = object.image;
      if (object.choices) {
        object.choices.forEach((occ: any) => {
          const questionchoice = new QuestionChoice(occ);
          this.choices.push(questionchoice);
        });
      }
      this.visibility = object.visibility;
      this.section =
        object.section instanceof Section
          ? object.section
          : new Section(object.section);
      this.allowMultiplicator = object.allowMultiplicator;
      this.min = object.min;
      this.max = object.max;
      if (object.responses) {
        object.responses.forEach((occ: any) => {
          const response = new Response(occ);
          this.responses.push(response);
        });
      }
      this.survey =
        object.survey instanceof Survey
          ? object.survey
          : new Survey(object.survey);
      if (object.tags) {
        object.tags.forEach((occ: any) => {
          const tag = occ instanceof Tag ? occ : new Tag(occ);
          this.tags.push(tag);
        });
      }
      if (object.conditionGroups) {
        object.conditionGroups.forEach((occ: any) => {
          const questionconditiongroup =
            occ instanceof QuestionConditionGroup
              ? occ
              : new QuestionConditionGroup(occ);
          this.conditionGroups.push(questionconditiongroup);
        });
      }
      if (object.suggestions) {
        object.suggestions.forEach((occ: any) => {
          const suggestion =
            occ instanceof Suggestion ? occ : new Suggestion(occ);
          this.suggestions.push(suggestion);
        });
      }
      if (object.questionConditions) {
        object.questionConditions.forEach((occ: any) => {
          const questioncondition =
            occ instanceof QuestionCondition ? occ : new QuestionCondition(occ);
          this.questionConditions.push(questioncondition);
        });
      }
      this.isInline = object.isInline;
      this.allowBroadcast = object.allowBroadcast;
      this.extensionAccepted = object.extensionAccepted;
      this.uuid = object.uuid;
      if (object.createdAt) {
        this.createdAt = new Date(object.createdAt);
      }
      if (object.updatedAt) {
        this.updatedAt = new Date(object.updatedAt);
      }
      this.requiredRoles = object.requiredRoles;
      this.subscriptionMode = object.subscriptionMode;
      this.allowedSubscriptionRoles = object.allowedSubscriptionRoles || [];
      this.allowedSelectionRoles = object.allowedSelectionRoles || [];
      this.createBy = object.createBy;
      this.updateBy = object.updateBy;
      this.removeBy = object.removeBy;
      this.createdFromIp = object.createdFromIp;
      this.updatedFromIp = object.updatedFromIp;
      this.eventMessage = object.eventMessage;
    }

    this.postConstruct();
  }
}

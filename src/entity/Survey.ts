/* eslint-disabled */
import Step from "./Step";
import Platform from "./Platform";
import Tag from "./Tag";
import SurveyExtend from "@/entity/extends/SurveyExtend";
import Question from "@/entity/Question";
import Section from "@/entity/Section";
import Mapping from "@/entity/Mapping";

export default class Survey extends SurveyExtend {
    public id!: number;
    public branch?: string;
    public label = "";
    public slug = "";
    public template? = "";
    public steps: Array<Step> = [];
    public active?: boolean;
    public aliases: any[] = [];
    description?: string;
    public item? = "";
    public ranking!: number;
    public platforms: Array<Platform> = [];
    public isRoot?: boolean;
    public uuid = "";
    public createdAt?: Date;
    public updatedAt?: Date;
    public createdFromIp? = "";
    public updatedFromIp? = "";
    public deletedAt?: Date;
    public tags: Array<Tag> = [];
    public mappings: Array<Mapping> = [];
    public isImport?: boolean;
    public allowOrder?: boolean;
    public type?: 'FORM' | 'COMPARISON' | null;
    public completionMessage?: string;
    

    constructor(object?: any) {
        super(object);
        if (object) {
            this.id = object.id;
            this.branch = object.branch;
            this.label = object.label;
            this.slug = object.slug;
            this.allowOrder = object.allowOrder;
            this.template = object.template;
            this.description = object.description;
            this.isImport = object.isImport;
            if (object.steps) {
                object.steps.forEach((occ: any) => {
                    const step = new Step(occ);
                    this.steps.push(step);
                });
            }
            this.active = object.active;

            this.aliases = object.aliases;
            this.item = object.item;
            this.ranking = object.ranking;

            this.type= object.type;
            this.completionMessage= object.completionMessage;
            if (object.platforms) {
                object.platforms.forEach((occ: any) => {
                    const platform = new Platform(occ);
                    this.platforms.push(platform);
                });
            }
            this.isRoot = object.isRoot;
            this.uuid = object.uuid;
            if (object.createdAt) {
                this.createdAt = new Date(object.createdAt);
            }
            if (object.updatedAt) {
                this.updatedAt = new Date(object.updatedAt);
            }
            this.createdFromIp = object.createdFromIp;
            this.updatedFromIp = object.updatedFromIp;
            if (object.deletedAt) {
                this.deletedAt = new Date(object.deletedAt);
            }
            if (object.mappings) {
                object.mappings.forEach((occ: any) => {
                    const mapping = occ instanceof Mapping ? occ : new Mapping(occ);
                    this.mappings.push(mapping);
                });
            }
            if (object.tags) {
                object.tags.forEach((occ: any) => {
                    const tag = new Tag(occ);
                    this.tags.push(tag);
                });
            }
        }
    }
}

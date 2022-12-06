import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { GuidelineEntity } from "../entity/guideline.entity";


export class GuidelineRO {
    id: number;
    codeconvention : string;
    constructor(guideline : GuidelineEntity){
        this.id = guideline.guideline_id;
        this.codeconvention = guideline.codeconvention;
    }
}
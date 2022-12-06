import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { GuidelineEntity } from "../entity/guideline.entity";


export class GuidelineRO {
    codeconvention : string;
    constructor(guideline : GuidelineEntity){
        this.codeconvention = guideline.codeconvention;
    }
}
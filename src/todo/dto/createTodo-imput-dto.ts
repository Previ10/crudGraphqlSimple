import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsString, MaxLength } from "class-validator";

@InputType()
export class CreateTodoImput {

    @Field(() => String, { description: "IMPUT CREATE" })
    @IsString()
    @IsNotEmpty()
    @MaxLength(20)
    description: string;



}
import { Field, InputType, Int } from "@nestjs/graphql";
import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString, MaxLength, Min, isIn } from "class-validator";

@InputType()
export class UpdateTodoImput {

    @Field(() => Int,)
    @IsInt()
    @Min(1)
    id: number;

    @Field(() => String, { description: "IMPUT CREATE" })
    @IsString()
    @IsNotEmpty()
    @MaxLength(20)
    description?: string;

    @Field(() => Boolean, { nullable: true })
    @IsOptional()
    @IsBoolean()

    done?: boolean;

}
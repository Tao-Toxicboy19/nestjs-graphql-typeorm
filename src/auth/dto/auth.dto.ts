import { Field, InputType } from "@nestjs/graphql";
import { IsNumber, IsString } from "class-validator";

@InputType()
export class AuthDto {
    @Field(() => String)
    @IsString()
    username: string

    @Field(() => String)
    @IsString()
    password: string
}
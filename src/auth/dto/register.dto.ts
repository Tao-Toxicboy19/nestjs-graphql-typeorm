import { Field, InputType } from "@nestjs/graphql";
import { IsNumber, IsString } from "class-validator";

@InputType()
export class RegisterDto {
    @Field(() => String)
    @IsString()
    username: string

    @Field(() => String)
    @IsString()
    password: string

    @Field(() => String)
    @IsString()
    role: string

    @Field(() => String)
    @IsString()
    email: string
}
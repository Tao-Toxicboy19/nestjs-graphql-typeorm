import { Field, InputType, Int } from "@nestjs/graphql";
import { IsNumber, IsString } from "class-validator";

@InputType()
export class OrderDto {
    @Field(() => String)
    @IsString()
    product: string

    @Field(() => Int)
    @IsNumber()
    amount: number
}
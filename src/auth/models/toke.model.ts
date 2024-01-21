import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class TokenModel {
    @Field(() => String)
    accessToken: string
}
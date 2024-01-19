import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class AuthModel {
    @Field(() => String)
    id: string

    @Field(() => String)
    username: string

    @Field(() => String)
    password: string
}
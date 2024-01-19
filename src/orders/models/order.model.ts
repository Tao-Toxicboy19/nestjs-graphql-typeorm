import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class OrderMoel {
    @Field(() => String)
    id: string

    @Field(() => String)
    product: string

    @Field(() => Int)
    amount: number
}
import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class OrderType {
    @Field(() => Int)
    id: number;

    @Field(() => String)
    product: string;

    @Field(() => Int)
    amount: number;
}

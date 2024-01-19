import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class OrderType {
    @Field()
    id: number;

    @Field()
    product: string;

    @Field()
    amount: number;
}

import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { OrderType } from './type/order.type';
import { OrdersService } from './orders.service';
import { OrderDto } from './dto/order.dto';

@Resolver('Order')
export class OrdersResolver {
    constructor(private readonly ordersService: OrdersService) { }

    @Mutation(() => OrderType)
    async saveOrder(@Args('dto') dto: OrderDto): Promise<OrderType> {
        return this.ordersService.saveOrder(dto);
    }

    @Query(returns => [OrderType]) // ระบุประเภทของ schema ที่เราต้องการ
    findAll() {
        return [
            { id: 1, product: 'Product A', amount: 10 },
            { id: 2, product: 'Product B', amount: 5 },
            { id: 3, product: 'Product C', amount: 8 },
        ];
    }
}



import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { OrderMoel } from './models/order.model';
import { OrdersService } from './orders.service';
import { OrderDto } from './dto/order.dto';
import { Order } from './entities/order.entity';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';

@Resolver('Orders')
@UseGuards(AuthGuard)
export class OrdersResolver {
    constructor(private readonly ordersService: OrdersService) { }

    @Mutation(() => OrderMoel)
    async saveOrder(@Args('dto') dto: OrderDto): Promise<Order> {
        return await this.ordersService.saveOrder(dto);
    }

    @Query(() => [OrderMoel])
    async findAllOrder(): Promise<Order[]> {
        return await this.ordersService.findAll()
    }

    @Query(() => OrderMoel)
    async findById(@Args('id') id: string): Promise<Order> {
        return await this.ordersService.findById(id)
    }
}



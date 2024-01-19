import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { OrderDto } from './dto/order.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class OrdersService {
    constructor(@InjectRepository(Order) private readonly repoOrder: Repository<Order>) { }

    async saveOrder(dto: OrderDto): Promise<Order> {
        try {
            const order = await this.repoOrder.save(dto);
            return order;
        } catch (error) {
            throw new Error(error);
        }
    }
}

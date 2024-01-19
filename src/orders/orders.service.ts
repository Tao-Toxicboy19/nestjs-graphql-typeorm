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
            console.log(dto)
            // const order = this.repoOrder.create(dto)
            return
        } catch (error) {
            throw new Error(error)
        }
    }
}

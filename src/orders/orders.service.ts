import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { OrderDto } from './dto/order.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class OrdersService {
    constructor(
        @InjectRepository(Order)
        private readonly repoOrder: Repository<Order>
    ) { }

    async saveOrder(dto: OrderDto): Promise<Order> {
        try {
            if (!dto) {
                throw new HttpException('Order not found', HttpStatus.NOT_FOUND)
            }

            const order = await this.repoOrder.save(dto)

            return order
        } catch (error) {
            throw new Error(error)
        }
    }

    async findAll(): Promise<Order[]> {
        try {
            const orders = await this.repoOrder.find()

            if (!orders) {
                throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
            }

            return orders
        } catch (error) {
            throw new Error(error)
        }
    }

    async findById(id: string): Promise<Order> {
        try {
            const order = await this.repoOrder.findOne({ where: { id } })

            if (!order) {
                throw new HttpException('Not Found', HttpStatus.NOT_FOUND)
            }

            return order
        } catch (error) {
            throw new Error(error)
        }
    }
}

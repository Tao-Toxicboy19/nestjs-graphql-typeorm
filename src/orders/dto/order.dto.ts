import { IsNumber, IsString } from "class-validator";

export class OrderDto {
    @IsString()
    product: string

    @IsNumber()
    amount: number
}
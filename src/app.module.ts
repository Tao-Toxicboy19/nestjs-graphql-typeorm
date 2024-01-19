import { Module, ValidationPipe } from '@nestjs/common';
import { OrdersModule } from './orders/orders.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_PIPE } from '@nestjs/core';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      sortSchema: true,
      installSubscriptionHandlers: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost', // หรือชื่อ service ของคอนเทนเนอร์ Docker ของคุณ
      port: 5050, // พอร์ตที่คุณกำหนดใน docker-compose.yml
      username: 'root', // ผู้ใช้ที่คุณกำหนดใน docker-compose.yml
      password: '12345', // รหัสผ่านที่คุณกำหนดใน docker-compose.yml
      database: 'auth', // ชื่อฐานข้อมูลที่คุณกำหนดใน docker-compose.yml
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // ในโหมด development จะสร้างตารางใหม่ทุกรอบการรันแอปพลิเคชัน
      logging: true,
    }),
    OrdersModule
  ],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ]
})
export class AppModule { }

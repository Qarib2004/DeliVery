import { forwardRef, Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { PrismaService } from '../prisma.service';
import { UserService } from '../user/user.service';
import { ProductModule } from '../product/product.module';
import { ConfigModule } from '@nestjs/config';
import { StripeModule } from '../stripe/stripe.module';

@Module({
  imports: [ProductModule, ConfigModule,   forwardRef(() => StripeModule)],
  controllers: [OrderController],
  providers: [OrderService,PrismaService,UserService],
  exports: [OrderService]
})
export class OrderModule {}

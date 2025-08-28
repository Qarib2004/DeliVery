import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';
import { StripeModule } from './stripe/stripe.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { OrderModule } from './order/order.module';

@Module({
  imports: [ServeStaticModule.forRoot({
    rootPath:`$path/uploads`,
    serveRoot:'/uploads'
  }),ConfigModule.forRoot(),AuthModule, CategoryModule, ProductModule, UserModule, StripeModule, OrderModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

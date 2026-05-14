import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './users/auth/auth.module';
import { CartModule } from './cart/cart.module';

@Module({
  imports: [
    UsersModule,
    ProductsModule,
    AuthModule,
    MongooseModule.forRoot('mongodb://localhost:27017/nest'),
    CartModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CartSchema } from './Schemas/cart.schema';
import { UserSchema } from 'src/users/Schemas/user.scham';

@Module({
  imports: [MongooseModule.forFeature([{name:'Cart',schema:CartSchema},{name:"User",schema:UserSchema}])],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}

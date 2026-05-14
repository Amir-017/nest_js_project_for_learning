import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type CartDocument = HydratedDocument<Cart>;

@Schema()
export class Cart {
  @Prop()
  products!: { productId: string; quantity: number }[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userName!: string;
}

export const CartSchema = SchemaFactory.createForClass(Cart);

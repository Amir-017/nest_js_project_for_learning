    
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type ProductDocument = HydratedDocument<Product>;

@Schema()
export class Product {
  @Prop({ required: true  , trim: true , lowercase: true , minlength: 3 , maxlength: 50 })
  name!: string;

  @Prop({ required: true, min: 0, max: 10000 })
  price!: number;

  @Prop({ required: true, minlength: 3, maxlength: 200 })
  description!: string;

  @Prop({ type:mongoose.Schema.Types.ObjectId, ref: 'User' })
  userName!: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);

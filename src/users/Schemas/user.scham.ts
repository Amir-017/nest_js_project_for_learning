import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true, minLength: 3, maxLength: 15 })
  name!: string;

  @Prop({ required: true, match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/ , unique:true})
  email!: string;

  @Prop({ required: true, minLength: 6, maxLength: 100 })
  password!: string;

  @Prop({ default: 'user' })
    role!: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

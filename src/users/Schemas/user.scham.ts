import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

export enum AuthProvider {
  LOCAL = 'local',
  GOOGLE = 'google',
}

@Schema()
export class User {
  @Prop({ required: true, minLength: 3, maxLength: 15 })
  name!: string;

  @Prop({ required: true, match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, unique: true })
  email!: string;

  @Prop({ required: false, minLength: 6, maxLength: 100 })
  password?: string;

  @Prop({ enum: AuthProvider, default: AuthProvider.LOCAL })
  authProvider!: AuthProvider;

  @Prop({ default: 'user' })
  role!: string;

  @Prop({ required: false })
  googleId!: string;

    @Prop({ required: false })
  picture!: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

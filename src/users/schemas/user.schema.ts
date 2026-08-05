import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({timestamps: true})// inserta createdAt y updatedAt automaticamente
export class User {
  @Prop({ required: true,trim: true }) // El trim elimina los espacios en blanco al inicio y al final del string
  name: string;

  @Prop({ required: true, unique: true,trim: true, lowercase: true })
  email: string;

  @Prop({ required: true,minlength: 6 })
  password: string;

  @Prop({ type: [String], default: ['user'] })
  roles: string[];
}
export const UserSchema = SchemaFactory.createForClass(User);

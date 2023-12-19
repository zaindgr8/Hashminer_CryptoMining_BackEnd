import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Package_Enum } from '../enum/package_type.enum'; 

@Schema()
export class Package extends Document { 
   @Prop()
   price: number;
   @Prop({ default: 'Inactive' }) // Default status is 'inactive'
   status: string;
   @Prop({ default: null })
   start_date: string;
   @Prop({ default: null })
   expiry_date: string; 
}

export const PackageSchema = SchemaFactory.createForClass(Package);

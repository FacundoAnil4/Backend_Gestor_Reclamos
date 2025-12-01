import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type UsuarioDocument = HydratedDocument<Usuario>;

// Definimos los Enums
export enum RolUsuario {
  ADMIN = 'ADMIN',
  SOPORTE = 'SOPORTE',
  CLIENTE = 'CLIENTE',
}

export enum AreaUsuario {
  SISTEMAS = 'SISTEMAS',
  VENTAS = 'VENTAS',
  RRHH = 'RRHH',
  ATENCION_CLIENTE = 'ATENCION_CLIENTE',
  NINGUNA = 'NINGUNA', // Para clientes externos
}

@Schema({ timestamps: true })
export class Usuario {
  @Prop({ required: true, minlength: 3 })
  nombre: string;

  @Prop({ required: true, unique: true, match: /.+@.+\..+/ })
  email: string;

  @Prop({ required: true, enum: RolUsuario, type: String })
  rol: RolUsuario;

  @Prop({ required: true })
  password: string;

  @Prop({ type: Types.ObjectId, ref: 'Area', required: true })
  id_area: Types.ObjectId;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  // Soft Delete
  @Prop({ type: Date, default: null })
  deletedAt: Date;
}

export const UsuarioSchema = SchemaFactory.createForClass(Usuario);
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ _id: false })
export class Evidencia {
    @Prop( { required: true })
    nombre_archivo: string;

    @Prop({ required: true })
    url: string;

    @Prop({ required: true })
  mimetype: string; // Ej: "image/png", "application/pdf"
  
  @Prop({ default: Date.now })
  fecha_subida?: Date;
}

export const EvidenciaSchema = SchemaFactory.createForClass(Evidencia);
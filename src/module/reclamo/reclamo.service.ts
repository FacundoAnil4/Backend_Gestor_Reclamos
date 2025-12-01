import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { ReclamoRepository } from './repository/reclamo.repository'; 
import { CreateReclamoDto } from './dto/create-reclamo.dto';
import { ReclamoDocument } from './schema/reclamo.schema'; // Importamos el Enum
import { EstadoReclamo } from './enums/reclamo.enums';
import { UpdateReclamoDto } from './dto/update-reclamo.dto';
import { ReclamoHelper } from './helper/reclamo.helper';
import { HistorialReclamoService } from '../historial_reclamo/historial_reclamo.service';
import { CreateHistorialReclamoDto } from '../historial_reclamo/dto/create-historial_reclamo.dto';

@Injectable()
export class ReclamoService {
  constructor(
      private readonly reclamoRepository: ReclamoRepository,
      private readonly historialService: HistorialReclamoService 
  ) {}

  async create(createReclamoDto: CreateReclamoDto): Promise<ReclamoDocument> {
    const data = ReclamoHelper.mapDtoToEntity(createReclamoDto);
    const nuevoReclamo = this.reclamoRepository.create(data);  
    const reclamoGuardado = await this.reclamoRepository.save(nuevoReclamo);

    // Auditoría de Creación
    const historialDto: CreateHistorialReclamoDto = {
        accion: 'CREACIÓN: Reclamo registrado en el sistema',
        id_reclamo: reclamoGuardado._id.toString(),
        id_usuario_accion: createReclamoDto.id_usuario_creador
    };
    await this.historialService.create(historialDto);

    return reclamoGuardado;
  }

  async update(id: string, updateReclamoDto: UpdateReclamoDto): Promise<ReclamoDocument> {
    ReclamoHelper.validarId(id);

    const reclamoActual = await this.reclamoRepository.findById(id);
    if (!reclamoActual) throw new NotFoundException(`Reclamo ${id} no encontrado`);

    // VALIDACIÓN HU13: Cierre de Reclamo
    // Si cambia a CERRADO o RESUELTO, debe tener resumen.
    if (updateReclamoDto.id_estado_reclamo === EstadoReclamo.CERRADO || 
        updateReclamoDto.id_estado_reclamo === EstadoReclamo.RESUELTO) {
        
        // Si no envía resumen ahora y el reclamo no lo tenía de antes... ERROR.
        if (!updateReclamoDto.resumen_resolucion && !reclamoActual.resumen_resolucion) {
            throw new BadRequestException('Para cerrar o resolver un reclamo, debe proporcionar un resumen de resolución.');
        }
    }


    const data = ReclamoHelper.mapDtoToEntity(updateReclamoDto);

    // Preparar Auditoría
    const mensajesHistorial: string[] = [];
    if (updateReclamoDto.id_area && updateReclamoDto.id_area !== reclamoActual.id_area.toString()) {
        mensajesHistorial.push(`REASIGNACIÓN: Área cambiada a ${updateReclamoDto.id_area}`);
    }
    if (updateReclamoDto['id_usuario_asignado'] && updateReclamoDto['id_usuario_asignado'] !== reclamoActual.id_usuario_asignado?.toString()) {
        mensajesHistorial.push(`ASIGNACIÓN: Responsable cambiado a usuario ${updateReclamoDto['id_usuario_asignado']}`);
    }
    if (updateReclamoDto.id_prioridad && updateReclamoDto.id_prioridad !== reclamoActual.id_prioridad) {
        mensajesHistorial.push(`PRIORIDAD: Cambiada a ${updateReclamoDto.id_prioridad}`);
    }
    if (updateReclamoDto.id_estado_reclamo && updateReclamoDto.id_estado_reclamo !== reclamoActual.id_estado_reclamo) {
        mensajesHistorial.push(`ESTADO: Cambiado a ${updateReclamoDto.id_estado_reclamo}`);
    }

    // Ejecutar Update
    const reclamoActualizado = await this.reclamoRepository.update(id, data);
    if (!reclamoActualizado) {
        throw new NotFoundException(`Error al actualizar: Reclamo ${id} no encontrado`);
    }

    // Guardar Auditoría
    const actor = updateReclamoDto['id_usuario_asignado'] || reclamoActual.id_usuario_creador.toString();
    for (const accion of mensajesHistorial) {
        await this.historialService.create({
            accion: accion,
            id_reclamo: id,
            id_usuario_accion: actor 
        });
    }
    
    return reclamoActualizado;
  }

  async findAll(): Promise<ReclamoDocument[]> {
    return this.reclamoRepository.findAll();
  }

  async findOne(id: string): Promise<ReclamoDocument> {
    ReclamoHelper.validarId(id);
    const reclamo = await this.reclamoRepository.findByIdWithRelations(id);
    if (!reclamo) throw new NotFoundException(`Reclamo ${id} no encontrado`);
    return reclamo;
  }

  async findByProyecto(idProyecto: string): Promise<ReclamoDocument[]> {
    ReclamoHelper.validarId(idProyecto);
    return this.reclamoRepository.findAllByProyecto(idProyecto);
  }

  async findByArea(idArea: string): Promise<ReclamoDocument[]> {
    ReclamoHelper.validarId(idArea);
    return this.reclamoRepository.findAllByArea(idArea);
  }

  async findByUsuarioAsignado(idUsuario: string): Promise<ReclamoDocument[]> {
    ReclamoHelper.validarId(idUsuario);
    return this.reclamoRepository.findAllByUsuarioAsignado(idUsuario);
  }

  async remove(id: string): Promise<ReclamoDocument> {
    ReclamoHelper.validarId(id);
    const reclamoBorrado = await this.reclamoRepository.softDelete(id);
    if (!reclamoBorrado) throw new NotFoundException(`Reclamo ${id} no encontrado`);
    return reclamoBorrado;
  }

  async restore(id: string): Promise<ReclamoDocument> {
    ReclamoHelper.validarId(id);
    const reclamoRestaurado = await this.reclamoRepository.restore(id);
    if (!reclamoRestaurado) throw new NotFoundException(`No se pudo restaurar el reclamo ${id}`);
    return reclamoRestaurado;
  }
}
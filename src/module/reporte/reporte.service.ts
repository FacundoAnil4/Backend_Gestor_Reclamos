import { Injectable, Inject, NotFoundException, BadRequestException } from '@nestjs/common';
import type { IReporteRepository } from './repository/interface-reporte.repository';
import { CreateReporteDto } from './dto/create-reporte.dto';
import { UpdateReporteDto } from './dto/update-reporte.dto';
import { FilterReclamoDto } from '../reclamo/dto/filter-reclamo.dto';
import { ReporteHelper } from './helper/reporte.helper';
import { Parser } from 'json2csv';
import { Types } from 'mongoose';

@Injectable()
export class ReporteService {
  constructor(
    @Inject('IReporteRepository') // Usamos el token de inyección de la interfaz
    private readonly reporteRepository: IReporteRepository
  ) {}

  // --- ANALYTICS ---

  async getDashboardKpis() {
    return this.reporteRepository.getDashboardKpis();
  }

  async getReporteFiltrado(filters: FilterReclamoDto) {
    return this.reporteRepository.findReclamosByFilters(filters);
  }

  async exportarReporteCsv(filters: FilterReclamoDto): Promise<string> {
    const datos = await this.reporteRepository.findReclamosByFilters(filters);
    
    const datosPlanos = datos.map((r: any) => ({
        ID: r._id.toString(),
        Descripcion: r.descripcion_detallada,
        Estado: r.id_estado_reclamo,
        Prioridad: r.id_prioridad,
        Area: r.id_area?.nombre || 'N/A', // Asume que se hizo populate
        Fecha: r.createdAt ? r.createdAt.toISOString() : ''
    }));

    if (datosPlanos.length === 0) return '';
    const parser = new Parser();
    return parser.parse(datosPlanos);
  }

  // --- CRUD REPORTES (HU18) ---

  async create(createDto: CreateReporteDto) {
    const data = ReporteHelper.mapDtoToEntity(createDto);
    const reporte = this.reporteRepository.create(data);
    return await this.reporteRepository.save(reporte);
  }

  async findAllByUser(idUsuario: string) {
    if (!Types.ObjectId.isValid(idUsuario)) throw new BadRequestException('ID Usuario inválido');
    return this.reporteRepository.findAllByUser(idUsuario);
  }

  async update(id: string, updateDto: UpdateReporteDto) {
    ReporteHelper.validateId(id);
    const data = ReporteHelper.mapDtoToEntity(updateDto);
    // Nota: Necesitas agregar el método update en tu IReporteRepository y ReporteRepository
    // ... implementación similar a los otros módulos
    return null; // Placeholder hasta que actualices el repo con update
  }

  async remove(id: string) {
    ReporteHelper.validateId(id);
    const deleted = await this.reporteRepository.softDelete(id);
    if (!deleted) throw new NotFoundException(`Reporte ${id} no encontrado`);
    return deleted;
  }
}
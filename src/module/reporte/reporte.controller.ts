import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Res } from '@nestjs/common';
import { ReporteService } from './reporte.service';
import type { Response } from 'express';
import { CreateReporteDto } from './dto/create-reporte.dto';
import { UpdateReporteDto } from './dto/update-reporte.dto';
import { FilterReclamoDto } from '../reclamo/dto/filter-reclamo.dto';

@Controller('reportes')
export class ReporteController {
  constructor(private readonly reporteService: ReporteService) {}

  // --- ANALYTICS (HU15, HU16, HU17) ---

  @Get('dashboard')
  getDashboard() {
    return this.reporteService.getDashboardKpis();
  }

  // HU16: Usamos FilterReclamoDto para validar los query params
  @Get('filtrar')
  getReporte(@Query() filters: FilterReclamoDto) {
    return this.reporteService.getReporteFiltrado(filters);
  }

  // HU17: Exportar
  @Get('exportar')
  async exportarCsv(@Query() filters: FilterReclamoDto, @Res() res: Response) {
    const csv = await this.reporteService.exportarReporteCsv(filters);
    res.header('Content-Type', 'text/csv');
    res.attachment('reporte.csv');
    return res.send(csv);
  }

  // --- CRUD REPORTES GUARDADOS (HU18) ---

  @Post()
  create(@Body() createDto: CreateReporteDto) {
    return this.reporteService.create(createDto);
  }

  @Get('mis-reportes/:idUsuario')
  findAllByUser(@Param('idUsuario') idUsuario: string) {
    return this.reporteService.findAllByUser(idUsuario);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdateReporteDto) {
    return this.reporteService.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reporteService.remove(id);
  }
}
import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { HistorialReclamoService } from '../../historial_reclamo/historial_reclamo.service';
import { CreateHistorialReclamoDto } from '../../historial_reclamo/dto/create-historial_reclamo.dto';

@Controller('historial-reclamo')
export class HistorialReclamoController {
  constructor(private readonly historialService: HistorialReclamoService) {}

  @Post()
  create(@Body() createDto: CreateHistorialReclamoDto) {
    return this.historialService.create(createDto);
  }

  @Get()
  findAll() {
    return this.historialService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.historialService.findOne(id);
  }

  @Get('reclamo/:idReclamo')
  findByReclamo(@Param('idReclamo') idReclamo: string) {
    return this.historialService.findByReclamo(idReclamo);
  }
}
import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { HistorialEstadoService } from './historial_estado.service';
import { CreateHistorialEstadoDto } from './dto/create-historial_estado.dto';

@Controller('historial-estado')
export class HistorialEstadoController {
  constructor(private readonly historialService: HistorialEstadoService) {}

  @Post()
  create(@Body() createDto: CreateHistorialEstadoDto) {
    return this.historialService.create(createDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.historialService.findOne(id);
  }
}
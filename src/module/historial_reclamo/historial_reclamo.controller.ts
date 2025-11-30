import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HistorialReclamoService } from './historial_reclamo.service';
import { CreateHistorialReclamoDto } from './dto/create-historial_reclamo.dto';
import { UpdateHistorialReclamoDto } from './dto/update-historial_reclamo.dto';

@Controller('historial-reclamo')
export class HistorialReclamoController {
  constructor(private readonly historialReclamoService: HistorialReclamoService) {}

  @Post()
  create(@Body() createHistorialReclamoDto: CreateHistorialReclamoDto) {
    return this.historialReclamoService.create(createHistorialReclamoDto);
  }

  @Get()
  findAll() {
    return this.historialReclamoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.historialReclamoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHistorialReclamoDto: UpdateHistorialReclamoDto) {
    return this.historialReclamoService.update(+id, updateHistorialReclamoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.historialReclamoService.remove(+id);
  }
}

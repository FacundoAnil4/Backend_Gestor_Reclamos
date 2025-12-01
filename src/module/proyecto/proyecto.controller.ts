import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProyectoService } from './proyecto.service';
import { CreateProyectoDto } from './dto/create-proyecto.dto';
import { UpdateProyectoDto } from './dto/update-proyecto.dto';

@Controller('proyecto')
export class ProyectoController {
  constructor(private readonly proyectoService: ProyectoService) {}

  @Post()
  create(@Body() createDto: CreateProyectoDto) {
    return this.proyectoService.create(createDto);
  }

  @Get()
  findAll() {
    return this.proyectoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.proyectoService.findOne(id);
  }

  @Get('cliente/:idCliente')
  findByCliente(@Param('idCliente') idCliente: string) {
    return this.proyectoService.findByCliente(idCliente);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdateProyectoDto) {
    return this.proyectoService.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.proyectoService.remove(id);
  }
}
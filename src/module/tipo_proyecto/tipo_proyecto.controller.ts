import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TipoProyectoService } from './tipo_proyecto.service';
import { CreateTipoProyectoDto } from './dto/create-tipo_proyecto.dto';
import { UpdateTipoProyectoDto } from './dto/update-tipo_proyecto.dto';

@Controller('tipo-proyecto')
export class TipoProyectoController {
  constructor(private readonly tipoService: TipoProyectoService) {}

  @Post()
  create(@Body() createDto: CreateTipoProyectoDto) {
    return this.tipoService.create(createDto);
  }

  @Get()
  findAll() {
    return this.tipoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tipoService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdateTipoProyectoDto) {
    return this.tipoService.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tipoService.remove(id);
  }
  
  @Patch('restore/:id')
  restore(@Param('id') id: string) {
    return this.tipoService.restore(id);
  }
}
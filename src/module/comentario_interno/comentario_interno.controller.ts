import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ComentarioInternoService } from './comentario_interno.service';
import { CreateComentarioInternoDto } from './dto/create-comentario_interno.dto';
import { UpdateComentarioInternoDto } from './dto/update-comentario_interno.dto';

@Controller('comentario-interno')
export class ComentarioInternoController {
  constructor(private readonly comentarioService: ComentarioInternoService) {}

  @Post()
  create(@Body() createDto: CreateComentarioInternoDto) {
    return this.comentarioService.create(createDto);
  }

  @Get()
  findAll() {
    return this.comentarioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.comentarioService.findOne(id);
  }

  @Get('reclamo/:idReclamo')
  findByReclamo(@Param('idReclamo') idReclamo: string) {
    return this.comentarioService.findByReclamo(idReclamo);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdateComentarioInternoDto) {
    return this.comentarioService.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.comentarioService.remove(id);
  }
}
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ComentarioInternoService } from './comentario_interno.service';
import { CreateComentarioInternoDto } from './dto/create-comentario_interno.dto';
import { UpdateComentarioInternoDto } from './dto/update-comentario_interno.dto';

@Controller('comentario-interno')
export class ComentarioInternoController {
  constructor(private readonly comentarioInternoService: ComentarioInternoService) {}

  @Post()
  create(@Body() createComentarioInternoDto: CreateComentarioInternoDto) {
    return this.comentarioInternoService.create(createComentarioInternoDto);
  }

  @Get()
  findAll() {
    return this.comentarioInternoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.comentarioInternoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateComentarioInternoDto: UpdateComentarioInternoDto) {
    return this.comentarioInternoService.update(+id, updateComentarioInternoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.comentarioInternoService.remove(+id);
  }
}

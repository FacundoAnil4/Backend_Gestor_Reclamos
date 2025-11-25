import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ArchivoClienteService } from './archivo_cliente.service';
import { CreateArchivoClienteDto } from './dto/create-archivo_cliente.dto';
import { UpdateArchivoClienteDto } from './dto/update-archivo_cliente.dto';

@Controller('archivo-cliente')
export class ArchivoClienteController {
  constructor(private readonly archivoClienteService: ArchivoClienteService) {}

  @Post()
  create(@Body() createArchivoClienteDto: CreateArchivoClienteDto) {
    return this.archivoClienteService.create(createArchivoClienteDto);
  }

  @Get()
  findAll() {
    return this.archivoClienteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.archivoClienteService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateArchivoClienteDto: UpdateArchivoClienteDto) {
    return this.archivoClienteService.update(+id, updateArchivoClienteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.archivoClienteService.remove(+id);
  }
}

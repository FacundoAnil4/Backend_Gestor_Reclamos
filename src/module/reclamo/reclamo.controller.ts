import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReclamoService } from './reclamo.service';
import { CreateReclamoDto } from './dto/create-reclamo.dto';
import { UpdateReclamoDto } from './dto/update-reclamo.dto';

@Controller('reclamos')
export class ReclamoController {
  constructor(private readonly reclamoService: ReclamoService) {}

  @Post()
  create(@Body() createReclamoDto: CreateReclamoDto) {
    return this.reclamoService.create(createReclamoDto);
  }

  @Get()
  async findAll() {
    return this.reclamoService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.reclamoService.findOne(id);
  }

  @Get('proyecto/:idProyecto')
  async findByProyecto(@Param('idProyecto') idProyecto: string) {
    return this.reclamoService.findByProyecto(idProyecto);
  }

  // 🔥 HU07: Endpoint para filtrar por Área - ESTO FALTABA
  @Get('area/:idArea')
  async findByArea(@Param('idArea') idArea: string) {
    return this.reclamoService.findByArea(idArea);
  }
  
  @Get('asignados/:idUsuario')
  async findByUsuario(@Param('idUsuario') idUsuario: string) {
    return this.reclamoService.findByUsuarioAsignado(idUsuario);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateReclamoDto: UpdateReclamoDto) {
    return this.reclamoService.update(id, updateReclamoDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.reclamoService.remove(id);
  }

  @Patch('restore/:id')
  async restore(@Param('id') id: string) {
    return this.reclamoService.restore(id);
  }
}
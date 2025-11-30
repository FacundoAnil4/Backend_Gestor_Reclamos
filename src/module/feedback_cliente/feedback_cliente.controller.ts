import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FeedbackClienteService } from './feedback_cliente.service';
import { CreateFeedbackClienteDto } from './dto/create-feedback_cliente.dto';
import { UpdateFeedbackClienteDto } from './dto/update-feedback_cliente.dto';

@Controller('feedback-cliente')
export class FeedbackClienteController {
  constructor(private readonly feedbackService: FeedbackClienteService) {}

  @Post()
  create(@Body() createDto: CreateFeedbackClienteDto) {
    return this.feedbackService.create(createDto);
  }

  @Get()
  findAll() {
    return this.feedbackService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.feedbackService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdateFeedbackClienteDto) {
    return this.feedbackService.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.feedbackService.remove(id);
  }
}
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FeedbackClienteService } from './feedback_cliente.service';
import { CreateFeedbackClienteDto } from './dto/create-feedback_cliente.dto';
import { UpdateFeedbackClienteDto } from './dto/update-feedback_cliente.dto';

@Controller('feedback-cliente')
export class FeedbackClienteController {
  constructor(private readonly feedbackClienteService: FeedbackClienteService) {}

  @Post()
  create(@Body() createFeedbackClienteDto: CreateFeedbackClienteDto) {
    return this.feedbackClienteService.create(createFeedbackClienteDto);
  }

  @Get()
  findAll() {
    return this.feedbackClienteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.feedbackClienteService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFeedbackClienteDto: UpdateFeedbackClienteDto) {
    return this.feedbackClienteService.update(+id, updateFeedbackClienteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.feedbackClienteService.remove(+id);
  }
}

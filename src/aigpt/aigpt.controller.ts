import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AigptService } from './aigpt.service';
import { CreateAigptDto } from './dto/create-aigpt.dto';
import { UpdateAigptDto } from './dto/update-aigpt.dto';

@Controller('aigpt')
export class AigptController {
  constructor(private readonly aigptService: AigptService) {}

  @Post()
  create(@Body() createAigptDto: CreateAigptDto) {
    return this.aigptService.create(createAigptDto);
  }

  @Get()
  findAll() {
    return this.aigptService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.aigptService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAigptDto: UpdateAigptDto) {
    return this.aigptService.update(+id, updateAigptDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.aigptService.remove(+id);
  }
}

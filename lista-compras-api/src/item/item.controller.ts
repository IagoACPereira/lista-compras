import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ItemService } from './item.service';
import { ItemEntity } from './item.entity';
import { ItemDto } from './item.dto';

@Controller(`${ process.env.BASE_URL }/item`)
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Post('/')
  async adiciona(@Body() itemDto: ItemDto): Promise<ItemEntity> {
    return await this.itemService.adiciona(itemDto);
  }

  @Get('/')
  async exibeTodos(): Promise<ItemEntity[]> {
    return await this.itemService.exibeTodos();
  }

  @Get('/:id')
  async exibeUm(@Param('id') id: string | number): Promise<ItemEntity> {
    return await this.itemService.exibeUm(id);
  }

  @Put('/:id')
  async atualiza(
    @Param('id')
    id: string | number,
    @Body()
    itemDto: ItemDto,
  ): Promise<string> {
    return await this.itemService.atualiza(id, itemDto);
  }

  @Delete('/:id')
  async deleta(@Param() id: string | number): Promise<string> {
    return await this.itemService.deleta(id);
  }
}

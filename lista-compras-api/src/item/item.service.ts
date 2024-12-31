import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ItemEntity } from './item.entity';
import { Repository } from 'typeorm';
import { ItemDto } from './item.dto';

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(ItemEntity)
    private itemRepository: Repository<ItemEntity>,
  ) {}

  async adiciona(itemDto: ItemDto): Promise<ItemEntity> {
    const item: ItemEntity = new ItemEntity();
    item.nome = itemDto.nome;
    item.quantidade = itemDto.quantidade;
    item.comprado = itemDto.comprado;

    return this.itemRepository.save(item);
  }

  async exibeTodos(): Promise<ItemEntity[]> {
    return await this.itemRepository.find({
      order: {
        comprado: 'ASC',
        id: 'ASC',
      }
    });
  }

  async exibeUm(id: string | number): Promise<ItemEntity> {
    return await this.itemRepository.findOne({
      where: { id },
    });
  }

  async atualiza(id: string | number, itemDto: ItemDto): Promise<string> {
    const item: ItemEntity = new ItemEntity();
    item.nome = itemDto.nome;
    item.quantidade = itemDto.quantidade;
    item.comprado = itemDto.comprado;

    await this.itemRepository.update(id, item);
    return 'Atualizado com sucesso!';
  }

  async deleta(id: string | number): Promise<string> {
    await this.itemRepository.delete(id);
    return 'Deletado com sucesso!';
  }
}
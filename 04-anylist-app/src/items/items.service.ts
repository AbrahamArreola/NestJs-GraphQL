import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateItemInput, UpdateItemInput } from './dto';
import { Item } from './entities/item.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item) private readonly itemsRepository: Repository<Item>,
  ) {}

  async create(createItemInput: CreateItemInput): Promise<Item> {
    const newItem = this.itemsRepository.create(createItemInput);

    return await this.itemsRepository.save(newItem);
  }

  async findAll(): Promise<Item[]> {
    // TODO: implement pagination, filtering, etc.
    return this.itemsRepository.find();
  }

  async findOne(id: string): Promise<Item> {
    const item = await this.itemsRepository.findOneByOrFail({ id });

    return item;
  }

  async update(id: string, updateItemInput: UpdateItemInput): Promise<Item> {
    const item = await this.itemsRepository.preload(updateItemInput);

    if (!item) {
      throw new NotFoundException(
        `Unable to update: Item with id '${id}' not found`,
      );
    }

    return this.itemsRepository.save(item);
  }

  async remove(id: string): Promise<Item> {
    // TODO: soft delete, referential integrity, etc.
    const item = await this.findOne(id);

    await this.itemsRepository.remove(item);

    return { ...item, id };
  }
}

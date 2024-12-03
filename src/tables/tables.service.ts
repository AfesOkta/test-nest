import { Injectable } from '@nestjs/common';
import { Tables } from './tables.entity/tables.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TablesService {
  constructor(
    @InjectRepository(Tables)
    private tablesRepository: Repository<Tables>,
  ) {}

  async findAll(): Promise<Tables[]> {
    return this.tablesRepository.find();
  }

  async findOne(id: number): Promise<Tables> {
    return this.tablesRepository.findOneBy({ id });
  }

  async create(Tables: Partial<Tables>): Promise<Tables> {
    return this.tablesRepository.save(Tables);
  }

  async update(id: number, Tables: Partial<Tables>): Promise<Tables> {
    await this.tablesRepository.update(id, Tables);
    return this.tablesRepository.save(Tables);
  }

  async remove(id: number): Promise<void> {
    await this.tablesRepository.delete(id);
  }
}

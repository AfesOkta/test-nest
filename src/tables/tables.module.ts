import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tables } from './tables.entity/tables.entity';
import { TablesRepository } from './tables.repository';
import { TablesController } from './tables.controller';
import { TablesService } from './tables.service';

@Module({
  imports: [TypeOrmModule.forFeature([Tables, TablesRepository])],
  controllers: [TablesController],
  providers: [TablesService],
  exports: [TypeOrmModule],
})
export class TablesModule {}

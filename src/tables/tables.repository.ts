import { EntityRepository, Repository } from 'typeorm';
import { Tables } from './tables.entity/tables.entity';

@EntityRepository(Tables)
export class TablesRepository extends Repository<Tables> {}

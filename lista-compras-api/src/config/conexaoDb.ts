import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemEntity } from 'src/item/item.entity';

export const conexaoDb = TypeOrmModule.forRoot({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'lista_compra',
  entities: [ItemEntity],
  synchronize: true,
});

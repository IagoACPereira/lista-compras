import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'item' })
export class ItemEntity {
  @PrimaryGeneratedColumn()
  id: number | string;

  @Column()
  nome: string;

  @Column()
  quantidade: number;

  @Column()
  comprado: boolean;
}

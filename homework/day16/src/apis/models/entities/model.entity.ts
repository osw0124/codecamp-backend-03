import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Model {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;
}

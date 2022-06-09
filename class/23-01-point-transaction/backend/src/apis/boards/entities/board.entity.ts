import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity() //MySQL
@ObjectType() //GraphQL
export class Board {
  @PrimaryGeneratedColumn('increment') //MySQL
  @Field(() => Int) //GraphQL
  number: number;

  @Column()
  @Field(() => String)
  writer: string;

  @Column()
  @Field(() => String)
  title: string;

  @Column()
  @Field(() => String)
  contents: string;
}

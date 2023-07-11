import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({name: 'DATATEMP'})
export class Datatemp{
  @PrimaryColumn({name:"ID"})
  id: number

  @Column({name:"NAME"})
  name: string;

  @Column({name:"DESCRIPTION"})
  description: string;
}

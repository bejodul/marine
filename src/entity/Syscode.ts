import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity({ name: "SYS_CODES_LOCAL" })
export default class SysCodeLocal {
  @PrimaryColumn({ name: "CODE_TP", length: 10 })
  codeTp: string;

  @PrimaryColumn({ name: "CODE_REF", length: 12 })
  codeRef: string;

  @Column({ name: "DESCR", length: 200 })
  descr: string;

  @Column({ name: "UPD_TS", type: "date" })
  updTs: Date;

  @Column({ name: "UPD_BY", length: 50, nullable: true })
  updBy: string;

  @Column({ name: "DESCR_1", length: 500, nullable: true })
  descr1: string;
}

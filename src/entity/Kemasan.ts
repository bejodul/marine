import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity({ name: "KEMASAN", schema: "EAGLEMARINE" })
export default class Kemasan {
  @PrimaryColumn({ name: "KD_KEMASAN", length: 2 })
  kdKemasan: string;

  @Column({ name: "DET_KD_KEMASAN", length: 25 })
  detKdKemasan: string;

  @PrimaryColumn({ name: "SITE_ID", length: 20 })
  siteId: string;

  @PrimaryColumn({ name: "GROUP_ID", length: 5 })
  groupId: string;
}

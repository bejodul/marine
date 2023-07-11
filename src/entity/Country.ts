import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity({ name: 'BENDERA' })
export default class Country {
  @PrimaryColumn({ name: 'KD_BENDERA', length: 3 })
  kdBendera: string;

  @PrimaryColumn({ name: 'SITE_ID', length: 20 })
  siteId: string;

  @PrimaryColumn({ name: 'GROUP_ID', length: 5 })
  groupId: string;

  @Column({ name: 'NM_BENDERA', length: 100 })
  nmBendera: string;

  @Column({ name: 'KET', length: 1, nullable: true })
  ket: string;

  @Column({ name: 'TAX', length: 1, nullable: true })
  tax: string;
}

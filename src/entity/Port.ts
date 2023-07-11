import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity({ name: 'PELABUHAN' })
export default class Port {
  @PrimaryColumn({ name: 'PORT_CODE', length: 4 })
  portCode: string;

  @PrimaryColumn({ name: 'FLAG', length: 3 })
  flag: string;

  @PrimaryColumn({ name: 'SITE_ID', length: 20 })
  siteId: string;

  @PrimaryColumn({ name: 'GROUP_ID', length: 5 })
  groupId: string;

  @Column({ name: 'PORT_NAME', length: 100 })
  portName: string;
}

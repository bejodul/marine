import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('WEB_USER', { schema: 'EAGLEMARINE' })
export class User {
  @PrimaryColumn({ name: 'USER_NAME', type: 'varchar', length: 100 })
  userName: string;

  @Column({ name: 'PASSWORD', type: 'varchar', length: 250 })
  password: string;

  @Column({ name: 'COMPANY', type: 'varchar', length: 100 })
  company: string;

  @Column({ name: 'KD_AGEN', type: 'varchar', length: 10 })
  kdAgen: string;

  @Column({ name: 'CUSTOMER', type: 'varchar', length: 10 })
  customer: string;

  @Column({ name: 'LOG_COUNT', type: 'number', default: 0 })
  logCount: number;

  @Column({ name: 'KD_SHIPPER', type: 'varchar', length: 10 })
  kdShipper: string;

  @Column({ name: 'LOG_COUNT_MAX', type: 'number', nullable: true })
  logCountMax: number;

  @Column({ name: 'REG_TYPE', type: 'varchar', length: 30 })
  regType: string;

  @Column({ name: 'MASTER_TYPE', type: 'varchar', length: 2, default: '1' })
  masterType: string;

  @Column({ name: 'STATUS', type: 'varchar', length: 1 })
  status: string;

  @Column({ name: 'USER_PARENT', type: 'varchar', length: 100, nullable: true })
  userParent: string;

  @Column({ name: 'CHILD_INDEX', type: 'varchar', length: 100, default: '1' })
  childIndex: string;

  @Column({ name: 'NAME', type: 'varchar', length: 50 })
  name: string;

  @Column({ name: 'NEW_REGIST', type: 'char', length: 1, default: 'N' })
  newRegist: string;

  @Column({ name: 'HIST_FLG', type: 'char', length: 1, default: 'N' })
  histFlg: string;

  @Column({ name: 'IS_ADMIN', type: 'char', length: 1, default: 'N' })
  isAdmin: string;

  @Column({ name: 'CREATED_TS', type: 'date' })
  createdTs: Date;

  @Column({ name: 'UPDATE_TS', type: 'date' })
  updateTs: Date;

  @Column({ name: 'UPDATE_BY', type: 'varchar', length: 50 })
  updateBy: string;

  @Column({ name: 'EXPIRED_DATE', type: 'date' })
  expiredDate: Date;

  @Column({ name: 'ADDRESS', type: 'varchar', length: 100 })
  address: string;

  @Column({ name: 'CITY', type: 'varchar', length: 100 })
  city: string;

  @Column({ name: 'PROVINCE', type: 'varchar', length: 100 })
  province: string;

  @Column({ name: 'COUNTRY', type: 'varchar', length: 100 })
  country: string;

  @Column({ name: 'PHONE', type: 'varchar', length: 20 })
  phone: string;

  @Column({ name: 'EMAIL', type: 'varchar', length: 100 })
  email: string;

  @PrimaryColumn({ name: 'SITE_ID', type: 'varchar', length: 20 })
  siteId: string;

  @PrimaryColumn({ name: 'GROUP_ID', type: 'varchar', length: 5 })
  groupId: string;
}

import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Kade } from './Kade';
import { Pkk } from './Pkk';

@Entity({ name: 'OP_H' })
export class OpH {
  @PrimaryColumn({ name: 'VES_ID' })
  vesId: string;

  @PrimaryColumn({ name: 'OP_KE' })
  opKe: number;

  @Column({ name: 'KD_KAPAL' })
  kdKapal: string;

  @Column({ name: 'UKK' })
  ukk: number;

  @Column({ name: 'ID_RPK' })
  idRpk: string;

  @Column({ name: 'TGL_DOK' })
  tglDok: Date;

  @Column({ name: 'MULAI' })
  mulai: Date;

  @Column({ name: 'SELESAI' })
  selesai: Date;

  @Column({ name: 'KD_PBM' })
  kdPbm: string;

  @Column({ name: 'VALIDATOR' })
  validator: string;

  @Column({ name: 'TGL_VALIDASI' })
  tglValidasi: Date;

  @Column({ name: 'STATUS', length: 1 })
  status: string;

  @Column({ name: 'ETMAL', precision: 17, scale: 2 })
  etmal: number;

  @Column({ name: 'SOP' })
  sop: number;

  @Column({ name: 'RIIL', precision: 22, scale: 2 })
  riil: number;

  @Column({ name: 'KD_KADE' })
  kdKade: string;

  @Column({ name: 'KETERANGAN', length: 200 })
  keterangan: string;

  @Column({ name: 'KD_RECORD', default: null })
  kdRecord: string;

  @Column({ name: 'VALIDATOR_FROM', length: 1, default: null })
  validatorFrom: string;

  @Column({ name: 'USER_ID', default: null })
  userId: string;

  @Column({ name: 'LOKASI_USER', length: 30, default: null })
  lokasiUser: string;

  @Column({ name: 'UPD_TS', default: () => 'sysdate' })
  updTs: Date;

  @Column({ name: 'VALUTA' })
  valuta: number;

  @Column({ name: 'NO_FORM_1A', length: 10 })
  noForm1a: string;

  @Column({ name: 'PPKB_KE' })
  ppkbKe: number;

  @Column({ name: 'RKBMM_NO_IPN', length: 50 })
  rkbmmNoIpn: string;

  @Column({ name: 'RKBMB_NO_IPN', length: 50 })
  rkbmbNoIpn: string;

  @Column({ name: 'UPDATE_TS' })
  updateTs: Date;

  @Column({ name: 'UPDATE_BY' })
  updateBy: string;

  @PrimaryColumn({ name: 'SITE_ID' })
  siteId: string;

  @PrimaryColumn({ name: 'GROUP_ID' })
  groupId: string;

  @ManyToOne(() => Kade)
  @JoinColumn([{ name: 'SITE_ID', referencedColumnName: 'siteId' }, { name: 'GROUP_ID', referencedColumnName: 'groupId' }, { name: 'KD_KADE', referencedColumnName: 'kdKade' }])
  master_kade: Kade

  @ManyToOne(()=> Pkk)
  @JoinColumn([{ name: 'SITE_ID', referencedColumnName: 'siteId' }, { name: 'GROUP_ID', referencedColumnName: 'groupId' }, { name: 'VES_ID', referencedColumnName: 'vesId' }])
  pkk: Pkk
}

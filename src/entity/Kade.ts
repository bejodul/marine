import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity({ name: 'KADE' })
export class Kade {
  @PrimaryColumn({ name: 'KD_KADE' })
  kdKade: string;

  @Column({ name: 'NM_KADE' })
  nmKade: string;

  @Column({ name: 'JN_KADE' })
  jnKade: string;

  @Column({ name: 'NM_PEMILIK' })
  nmPemilik: string;

  @Column({ name: 'KD_WIL_PELABUHAN', default: '1' })
  kdWilPelabuhan: string;

  @Column({ name: 'KD_DERMAGA', default: '1' })
  kdDermaga: string;

  @Column({ name: 'KD_PANGKALAN', default: '1' })
  kdPangkalan: string;

  @Column({ name: 'M_AWAL', default: '0' })
  mAwal: string;

  @Column({ name: 'M_AKHIR', default: '0' })
  mAkhir: string;

  @Column({ name: 'KD_LOKASI', default: '1' })
  kdLokasi: string;

  @Column({ name: 'KD_SIMTEK' })
  kdSimtek: string;

  @Column({ name: 'KD_LOKASI_PENUNDAAN', default: '1' })
  kdLokasiPenundaan: string;

  @Column({ name: 'WKT_TEMPUH_TUNDA', default: 0 })
  wktTempuhTunda: number;

  @Column({ name: 'KEDALAMAN', default: 0 })
  kedalaman: number;

  @Column({ name: 'BASE_MASUK' })
  baseMasuk: number;

  @Column({ name: 'BASE_PINDAH' })
  basePindah: number;

  @Column({ name: 'BASE_KELUAR' })
  baseKeluar: number;

  @Column({ name: 'WKT_TEMPUH_TUNDA_KLR', default: 0 })
  wktTempuhTundaKlr: number;

  @Column({ name: 'CREATE_BY' })
  createBy: string;

  @Column({ name: 'CREATE_TS' })
  createTs: Date;

  @Column({ name: 'UPDATE_BY' })
  updateBy: string;

  @Column({ name: 'UPDATE_TS' })
  updateTs: Date;

  @Column({ name: 'KD_KADE_IPN' })
  kdKadeIpn: string;

  @Column({ name: 'ZONA' })
  zona: string;

  @PrimaryColumn({ name: 'SITE_ID' })
  siteId: string;

  @PrimaryColumn({ name: 'GROUP_ID' })
  groupId: string;

}

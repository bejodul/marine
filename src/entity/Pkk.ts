import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity({ name: 'PKK'})
export class Pkk {
  @PrimaryColumn({ name: 'VES_ID' })
  vesId: string;

  @PrimaryColumn({ name: 'SITE_ID' })
  siteId: string;

  @PrimaryColumn({ name: 'GROUP_ID' })
  groupId: string;

  @Column({ name: 'VES_CODE', length: 4 })
  vesCode: string;

  @Column({ name: 'VOY_IN', length: 50 })
  voyIn: string;

  @Column({ name: 'VOY_OUT', length: 50 })
  voyOut: string;

  @Column({ name: 'ETA' })
  eta: Date;

  @Column({ name: 'ETD' })
  etd: Date;

  @Column({ name: 'KP_GRT', precision: 8, scale: 2 })
  kpGrt: number;

  @Column({ name: 'KP_LOA', precision: 8, scale: 2 })
  kpLoa: number;

  @Column({ name: 'JN_KEMASAN', length: 2 })
  jnKemasan: string;

  @Column({ name: 'JN_KAPAL', length: 2 })
  jnKapal: string;

  @Column({ name: 'JN_PLAYAR', length: 2 })
  jnPlayar: string;

  @Column({ name: 'JN_KUNJUNGAN', length: 2 })
  jnKunjungan: string;

  @Column({ name: 'JN_KEGIATAN', length: 2 })
  jnKegiatan: string;

  @Column({ name: 'KD_PROSES', default: '0', length: 2 })
  kdProses: string;

  @Column({ name: 'PEL_ASAL', length: 5 })
  pelAsal: string;

  @Column({ name: 'PEL_SEBELUM', length: 5 })
  pelSebelum: string;

  @Column({ name: 'PEL_BERIKUT', length: 5 })
  pelBerikut: string;

  @Column({ name: 'PEL_AKHIR', length: 5 })
  pelAkhir: string;

  @Column({ name: 'CREATED_BY', length: 100 })
  createdBy: string;

  @Column({ name: 'CREATED_DATE' })
  createdDate: Date;

  @Column({ name: 'PILOT', length: 200 })
  pilot: string;

  @Column({ name: 'LOAD' })
  load: number;

  @Column({ name: 'STATUS', length: 1, default: 'N' })
  status: string;

  @Column({ name: 'AGENT', length: 3 })
  agent: string;

  @Column({ name: 'BENDERA', length: 2 })
  bendera: string;

  @Column({ name: 'KP_DWT' })
  kpDwt: number;

  @Column({ name: 'LINER', length: 4 })
  liner: string;

  @Column({ name: 'VES_NAME', length: 200 })
  vesName: string;

  @Column({ name: 'NM_AGENT', length: 200 })
  nmAgent: string;

  @Column({ name: 'ST_KAPAL', length: 2, default: '1' })
  stKapal: string;

  @Column({ name: 'RPKOP', length: 1, default: 'N' })
  rpkop: string;

  @Column({ name: 'UPDATE_BY', length: 100 })
  updateBy: string;

  @Column({ name: 'UPDATE_TS' })
  updateTs: Date;

  @Column({ name: 'KETERANGAN_PKK', length: 500 })
  keteranganPkk: string;

  @Column({ name: 'TAX_TREATY', length: 2 })
  taxTreaty: string;

  @Column({ name: 'PENYALURAN_OP', length: 2 })
  penyaluranOp: string;

  @Column({ name: 'PKK_NO', length: 50 })
  pkkNo: string;

  @Column({ name: 'PPK_NO', length: 50 })
  ppkNo: string;

  @Column({ name: 'PKK_MAN_NO', length: 50 })
  pkkManNo: string;

  @Column({ name: 'DIRECT_CALL', length: 1 })
  directCall: string;

  @Column({ name: 'BANK_CD', length: 3 })
  bankCd: string;

  @Column({ name: 'BC11', length: 6 })
  bc11: string;

  @Column({ name: 'BC11_TS' })
  bc11Ts: Date;

  @Column({ name: 'DOC_CUTOFF_TS' })
  docCutoffTs: Date;

  @Column({ name: 'CUTOFF_TS' })
  cutoffTs: Date;

  @Column({ name: 'AVAILABLE_TS' })
  availableTs: Date;

  @Column({ name: 'CLOSSING_CARGO_TS' })
  clossingCargoTs: Date;

  @Column({ name: 'CLOSSING_DOC_TS' })
  clossingDocTs: Date;
}

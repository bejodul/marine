import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity({ name: 'VESSELS', schema: 'EAGLEMARINE' })
export default class Vessel {
  @PrimaryColumn({ name: 'VES_CODE' })
  vesCode!: string;

  @PrimaryColumn({ name: 'SITE_ID' })
  siteId!: string;

  @PrimaryColumn({ name: 'GROUP_ID' })
  groupId!: string;

  @Column({ name: 'VES_CLASS', length: 10, default: ' ' })
  vesClass!: string;

  @Column({ name: 'VES_NO', length: 20 })
  vesNo!: string;

  @Column({ name: 'VES_NAME', length: 100 })
  vesName!: string;

  @Column({ name: 'PROFILE', length: 25 })
  profile!: string;

  @Column({ name: 'PRINCIPAL', length: 20 })
  principal!: string;

  @Column({ name: 'HOME_PORT', length: 100 })
  homePort!: string;

  @Column({ name: 'HATCH_TYPE', length: 1 })
  hatchType!: string;

  @Column({ name: 'PPN_TAX_RATE', type: 'numeric', precision: 9, scale: 3 })
  ppnTaxRate!: number;

  @Column({ name: 'CONSORTIA_TYPE', length: 10 })
  consortiaType!: string;

  @Column({ name: 'VES_SERVICE_TYPE', length: 1 })
  vesServiceType!: string;

  @Column({ name: 'CARGO_GEAR_TOTAL', length: 47 })
  cargoGearTotal!: string;

  @Column({ name: 'SWL_GEAR', type: 'numeric', precision: 9, scale: 3, default: '0' })
  swlGear!: number;

  @Column({ name: 'YEAR_MADE', length: 4 })
  yearMade!: string;

  @Column({ name: 'HORSE_POWER', type: 'numeric', precision: 9, scale: 3 })
  horsePower!: number;

  @Column({ name: 'DRAFT', type: 'numeric', precision: 9, scale: 3 })
  draft!: number;

  @Column({ name: 'CERTIFICATE_YN', length: 1 })
  certificateYn!: string;

  @Column({ name: 'CALL_SIGN', length: 20, default: '-' })
  callSign!: string;

  @Column({ name: 'LLOYDS_NO', length: 20, default: '0' })
  lloydsNo!: string;

  @Column({ name: 'REG_FLG', length: 100 })
  regFlg!: string;

  @Column({ name: 'GROSS_TON', type: 'numeric', precision: 9, scale: 3 })
  grossTon!: number;

  @Column({ name: 'DWF', type: 'numeric', precision: 20, scale: 3, default: '0' })
  dwf!: number;

  @Column({ name: 'VES_LEN', type: 'numeric', precision: 9, scale: 3 })
  vesLen!: number;

  @Column({ name: 'UPD_TS', type: 'date' })
  updTs!: Date;

  @Column({ name: 'AGENT', length: 4 })
  agent!: string;

  @Column({ name: 'LINER', length: 4 })
  liner!: string;

  @Column({ name: 'LINER_NAME', length: 50 })
  linerName!: string;

  @Column({ name: 'OCEAN_INTERISLAND', length: 1 })
  oceanInterisland!: string;

  @Column({ name: 'COUNTRY_MADE', length: 100 })
  countryMade!: string;

  @Column({ name: 'REMARK', length: 500 })
  remark!: string;

  @Column({ name: 'USERID', length: 100 })
  userid!: string;

  @Column({ name: 'KAPASITAS_TEUS', type: 'numeric', precision: 5, scale: 0 })
  kapasitasTeus!: number;

  @Column({ name: 'SURAT_UKUR_NO', length: 25 })
  suratUkurNo!: string;

  @Column({ name: 'SURAT_UKUR_TGL', type: 'date' })
  suratUkurTgl!: Date;

  @Column({ name: 'JUMLAH_PALKA', type: 'numeric' })
  jumlahPalka!: number;

  @Column({ name: 'VES_TYPE', length: 10 })
  vesType!: string;

  @Column({ name: 'VES_ID', type: 'numeric' })
  vesId!: number;

  @Column({ name: 'COMPLETE', length: 1 })
  complete!: string;

  @Column({ name: 'IMO', length: 7 })
  imo!: string;

  @Column({ name: 'STATUS_KEAGENAN', length: 15 })
  statusKeagenan!: string;

  @Column({ name: 'ST_KAPAL', length: 2 })
  stKapal!: string;

  @Column({ name: 'STATUS', length: 1 })
  status!: string;

  @Column({ name: 'VES_SEQ', length: 20 })
  vesSeq!: string;

  @Column({ name: 'CERTIFICATE_NO', length: 100 })
  certificateNo!: string;

  @Column({ name: 'CERTIFICATE_DATE', type: 'date' })
  certificateDate!: Date;

  @Column({ name: 'TOT_HATCH' })
  totHatch!: number;

  @Column({ name: 'TAX_TREATY', length: 2 })
  taxTreaty!: string;

  @Column({ name: 'NO_PENDAFTARAN', length: 150 })
  noPendaftaran!: string;

  @Column({ name: 'CREATED_TS', type: 'date' })
  createdTs!: Date;

  @Column({ name: 'DIRECT_CALL', length: 2 })
  directCall!: string;

  @Column({ name: 'UPDATE_TS', type: 'date' })
  updateTs!: Date;

  @Column({ name: 'UPDATE_BY', length: 100 })
  updateBy!: string;
}

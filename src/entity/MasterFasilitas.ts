import { Entity, Column, PrimaryColumn } from 'typeorm'

@Entity({ name: 'MASTER_FASILITAS' })
export class MasterFasilitas {
  @PrimaryColumn({ name: 'FASILITAS_ID', length: 6 })
  fasilitasId: string

  @Column({ name: 'JN_FAS', length: 2 })
  jnFas: string

  @Column({ name: 'NM_FAS', length: 100 })
  nmFas: string

  @Column({ name: 'STATUS', length: 1 })
  status: string

  @Column({ name: 'PANJANG_SELURUH', type: 'decimal', precision: 5, scale: 2 })
  panjangSeluruh: number

  @Column({ name: 'PANJANG_GARIS_AIR', type: 'decimal', precision: 5, scale: 2 })
  panjangGarisAir: number

  @Column({ name: 'LEBAR', type: 'decimal', precision: 5, scale: 2 })
  lebar: number

  @Column({ name: 'DALAM', type: 'decimal', precision: 5, scale: 2 })
  dalam: number

  @Column({ name: 'TINGGI', type: 'decimal', precision: 5, scale: 2 })
  tinggi: number

  @Column({ name: 'ISI_KOTOR', type: 'decimal', precision: 5, scale: 2 })
  isiKotor: number

  @Column({ name: 'ISI_BERSIH', type: 'decimal', precision: 5, scale: 2 })
  isiBersih: number

  @Column({ name: 'BERAT_BENAMAN_DWT', type: 'decimal', precision: 5, scale: 2 })
  beratBenamanDwt: number

  @Column({ name: 'DRAFT_MUKA', type: 'decimal', precision: 5, scale: 2 })
  draftMuka: number

  @Column({ name: 'DRAFT_BELAKANG', type: 'decimal', precision: 5, scale: 2 })
  draftBelakang: number

  @Column({ name: 'KECEPATAN_PER_JAM', type: 'decimal', precision: 5, scale: 2 })
  kecepatanPerJam: number

  @Column({ name: 'ISI_TANGKI_BBM', type: 'decimal', precision: 5, scale: 2 })
  isiTangkiBbm: number

  @Column({ name: 'ISI_TANGKI_AIR_TAWAR', type: 'decimal', precision: 5, scale: 2 })
  isiTangkiAirTawar: number

  @Column({ name: 'ALAT_PENGGERAK', length: 25, nullable: true })
  alatPenggerak: string

  @Column({ name: 'MERK_MSN_INDUK', length: 25, nullable: true })
  merkMsnInduk: string

  @Column({ name: 'TYPE_MDL_MSN_INDUK', length: 25, nullable: true })
  typeMdlMsnInduk: string

  @Column({ name: 'NO_SERI_MSN_INDUK', length: 25, nullable: true })
  noSeriMsnInduk: string

  @Column({ name: 'DAYA_MSN_INDUK', type: 'decimal', precision: 7, scale: 2, nullable: true })
  dayaMsnInduk: number

  @Column({ name: 'JML_CYLINDER_MSN_INDUK', length: 25, nullable: true })
  jmlCylinderMsnInduk: string

  @Column({ name: 'PTARAN_MAX_RPM_MSN_INDUK', type: 'decimal', precision: 7, scale: 2, nullable: true })
  ptaranMaxRpmMsnInduk: number

  @Column({ name: 'PAKAI_BBM_JAM_STATIONERING', type: 'decimal', precision: 7, scale: 2, nullable: true })
  pakaiBbmJamStationering: number

  @Column({ name: 'PAKAI_BBM_JAM_PTARAN_PENUH', type: 'decimal', precision: 7, scale: 2, nullable: true })
  pakaiBbmJamPtaranPenuh: number

  @Column({ name: 'STARTING', length: 25, nullable: true })
  starting: string

  @Column({ name: 'MERK_MSN_BANTU_GENERATOR', length: 25, nullable: true })
  merkMsnBantuGenerator: string

  @Column({ name: 'TYPE_MDEL_MSN_BANTU_GNRTOR', length: 25, nullable: true })
  typeMdlMsnBantuGnrtor: string

  @Column({ name: 'DAYA_MSN_BANTU_GNRTOR', type: 'decimal', precision: 7, scale: 2, nullable: true })
  dayaMsnBantuGnrtor: number

  @Column({ name: 'PAKAIN_BBM_JAM_MSN_BNTU_GNRTOR', type: 'decimal', precision: 7, scale: 2, nullable: true })
  pakainBbmJamMsnBntuGnrtor: number

  @Column({ name: 'PTARAN_MAX_RPM_MSN_BNTU_GNRTOR', type: 'decimal', precision: 7, scale: 2, nullable: true })
  ptaranMaxRpmMsnBntuGnrtor: number

  @Column({ name: 'MERK_POMPA_PMADAM', length: 25, nullable: true })
  merkPompaPmadam: string

  @Column({ name: 'TYPE_MDL_POMPA_PMADAM', length: 25, nullable: true })
  typeMdlPompaPmadam: string

  @Column({ name: 'DAYA_POMPA_PMADAM', type: 'decimal', precision: 7, scale: 2, nullable: true })
  dayaPompaPmadam: number

  @Column({ name: 'BBM_JAM_POMPA_PMADAM', type: 'decimal', precision: 7, scale: 2, nullable: true })
  bbmJamPompaPmadam: number

  @Column({ name: 'BAHAN', length: 25, nullable: true })
  bahan: string

  @Column({ name: 'TAHUN_PEMBUATAN', length: 4, nullable: true })
  tahunPembuatan: string

  @Column({ name: 'TAHUN_PEMAKAIAN', length: 4, nullable: true })
  tahunPemakaian: string

  @Column({ name: 'JN_BAHAN_PROPELLER', length: 25, nullable: true })
  jnBahanPropeller: string

  @Column({ name: 'DIAMETER_PROPELLER', type: 'decimal', precision: 7, scale: 2, nullable: true })
  diameterPropeller: number

  @Column({ name: 'PITCH_PROPELLER', type: 'decimal', precision: 7, scale: 2, nullable: true })
  pitchPropeller: number

  @Column({ name: 'GANTI_MINYAK_PLUMAS_MTR_INDUK', length: 25, nullable: true })
  gantiMinyakPlumasMtrInduk: string

  @Column({ name: 'PAKAI_PLUMAS_HIDRAULIC_KEMUDI', length: 25, nullable: true })
  pakaiPlumasHydraulicKemudi: string

  @Column({ name: 'PAKAI_PLUMAS_ZPELLER', length: 25, nullable: true })
  pakaiPlumasZpeller: string

  @Column({ name: 'PAKAI_PLUMAS_TYPE_MDL', length: 25, nullable: true })
  pakaiPlumasTypeMdl: string

  @Column({ name: 'PAKAI_PLUMAS_SERIE', length: 25, nullable: true })
  pakaiPlumasSerie: string

  @Column({ name: 'JML_LIFE_JACKET', type: 'decimal', precision: 5, scale: 2, nullable: true })
  jmlLifeJacket: number

  @Column({ name: 'JML_LIFE_BUOY', type: 'decimal', precision: 5, scale: 2, nullable: true })
  jmlLifeBuoy: number

  @Column({ name: 'JML_PORTABLE_FFE', type: 'decimal', precision: 5, scale: 2, nullable: true })
  jmlPortableFfe: number

  @Column({ name: 'JML_SEKOCI', type: 'decimal', precision: 5, scale: 2, nullable: true })
  jmlSekoci: number

  @Column({ name: 'CREATE_BY', length: 100, nullable: true })
  createBy: string

  @Column({ name: 'CREATE_DATE', type: 'date', nullable: true })
  createDate: Date

  @Column({ name: 'UPDATE_BY', length: 100, nullable: true })
  updateBy: string

  @Column({ name: 'UPDATE_DATE', type: 'date', nullable: true })
  updateDate: Date

  @Column({ name: 'EMAIL1', length: 250, nullable: true })
  email1: string

  @Column({ name: 'EMAIL2', length: 250, nullable: true })
  email2: string

  @Column({ name: 'CALL_SIGN', length: 20, nullable: true })
  callSign: string

  @Column({ name: 'PERSEN_SHARING', type: 'decimal', nullable: true })
  persenSharing: number

  @Column({ name: 'MILIK', length: 1, nullable: true })
  milik: string

  @Column({ name: 'SITE_ID', length: 20, nullable: true })
  siteId: string

  @Column({ name: 'GROUP_ID', length: 5, nullable: true })
  groupId: string
}


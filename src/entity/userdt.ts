import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({ name: 'TBL_USER' })
export class TBL_USER {
    @PrimaryColumn({ name: "ID" })
    id: number

    @Column({ name: "NAMA" })
    nama: string
}

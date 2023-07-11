import 'reflect-metadata';
import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({ name: "WEB_MENU" })
export class WebMenu {
  @Column({ type: "char", length: 1 })
  MENU_LEVEL: string;

  @Column()
  MENU_INDEX: number;

  @PrimaryColumn({ type: "char", length: 30 })
  MENU_ID: string;

  @Column({ length: 50, name: "MENU_ITEM" })
  title: string;

  @Column({ length: 30 })
  PARENT_ID: string;

  @Column({ type: "timestamp" })
  UPD_TS: Date;

  @Column({ length: 100, name: "APP" })
  path: string;

  @Column({ length: 100 })
  APP_DET: string;

  @Column({ length: 100 })
  APP_ICON: string;

  toJSON() {
    return {
      MENU_LEVEL: this.MENU_LEVEL,
      MENU_INDEX: this.MENU_INDEX,
      MENU_ID: this.MENU_ID,
      title: this.title,
      UPD_TS: this.UPD_TS,
      path: this.path,
      APP_DET: this.APP_DET,
      APP_ICON: this.APP_ICON,
    }
  }
}

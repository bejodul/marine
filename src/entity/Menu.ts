import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({ name: "WEB_MENU" })
export class Menu {
  @Column({ name: "MENU_LEVEL", type: "char", length: 1 })
  menuLevel: string;

  @Column({ name: "MENU_INDEX" })
  menuIndex: number;

  @PrimaryColumn({ name: "MENU_ID", type: "char", length: 30 })
  menuId: string;

  @PrimaryColumn({ name: "SITE_ID", length: 20 })
  siteId: string;

  @PrimaryColumn({ name: "GROUP_ID", length: 5 })
  groupId: string;

  @Column({ length: 50, name: "MENU_ITEM" })
  title: string;

  @Column({ name: "PARENT_ID", length: 30 })
  parentId: string;

  @Column({ type: "timestamp" })
  UPD_TS: Date;

  @Column({ length: 100, name: "APP" })
  path: string;

  @Column({ length: 100 })
  APP_DET: string;

  @Column({ length: 100 })
  APP_ICON: string;
}

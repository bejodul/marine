import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Menu } from './Menu';
import { User } from './User';

@Entity('WEB_USER_MENU')
export class MenuClass {
  @PrimaryColumn({ name: 'USER_CLASS', type: 'varchar', length: 100 })
  userClass: string;

  @PrimaryColumn({ name: 'MENU_ID', type: 'char', length: 30 })
  menuId: string;

  @Column({ name: 'CREATE_TS', type: 'date' })
  createTs: Date;

  @Column({ name: 'CREATE_BY', type: 'varchar', length: 100 })
  createBy: string;

  @Column({ name: 'SITE_ID', type: 'varchar', length: 20 })
  siteId: string;

  @Column({ name: 'GROUP_ID', type: 'varchar', length: 5 })
  groupId: string;

  @ManyToOne(() => Menu)
  @JoinColumn([{ name: 'SITE_ID', referencedColumnName: 'siteId' }, { name: 'GROUP_ID', referencedColumnName: 'groupId' }, { name: 'MENU_ID', referencedColumnName: 'menuId' }])
  menu: Menu

  @ManyToOne(() => User)
  @JoinColumn([{ name: 'SITE_ID', referencedColumnName: 'siteId' }, { name: 'GROUP_ID', referencedColumnName: 'groupId' }, { name: 'USER_CLASS', referencedColumnName: 'regType' }])
  user: User
}

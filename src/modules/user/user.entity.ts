import {
  Entity,
  Column,
  Index,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

// 用户基础信息表
@Entity({
  name: 'rbac_user',
})
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ comment: '姓名', nullable: true, length: 100 })
  name: string;

  @Index({
    unique: false,
  })
  @Column({ comment: '手机', nullable: true, length: 20 })
  phone: string;

  @Column({ comment: '密码', length: 50 })
  password: string;

  @Column({ comment: '角色', length: 100 })
  role: string;

  @Column({ comment: '头像', nullable: true })
  headImg: string;

  @Column({ comment: '邮箱', nullable: true })
  email: string;

  @Column({ comment: '备注', nullable: true })
  remark: string;

  @Column({
    comment: '状态 0:禁用 1：启用 2：冻结',
    default: 1,
    type: 'tinyint',
  })
  status: number;

  @Index()
  @CreateDateColumn({ comment: '创建时间' })
  createTime: Date;

  @Index()
  @UpdateDateColumn({ comment: '更新时间' })
  updateTime: Date;
}

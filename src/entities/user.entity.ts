import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Role } from '../modules/common/rbac/role.enum';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 255, unique: true, nullable: false })
  login!: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  passwordHash!: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  name!: string;

  @Column({ type: 'enum', enum: Role, array: true, nullable: false })
  roles!: Role[];
}
